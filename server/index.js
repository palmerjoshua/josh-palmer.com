let express = require('express');
let axios = require('axios');
let bodyParser = require('body-parser');
let helpers = require('./helpers');
const config = require('../config');
const secret = require('../secret');
let database = require('./database');
const ALLOWED_ORIGIN = config[config.deployment].origin;
const CAPTCHA_SECRET = secret.google.recaptcha.secret_key;

let app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, g-recaptcha-response");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const verifyCaptcha = (response, remoteip) => {
   let baseUrl = 'https://www.google.com/recaptcha/api/siteverify',
       params = `?secret=${CAPTCHA_SECRET}&response=${response}&remoteip=${remoteip}`,
       url = `${baseUrl}${params}`,
       headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'};
    return axios({method: 'post', url: url, headers: headers});
};


app.post('/api/markdown/retrieve', (req, res) => {
    let postId = req.body['postId'];
    if(!postId) {
        res.status(400).send('Missing parameter "postId"');
    }
    database.getMarkdownFromTable(postId).then(tableResponse => {
        let payload = {markdown: tableResponse.Item.markdown},
            postId = tableResponse.Item.id;
        console.log('fetched post ' + postId);
        database.deleteMarkdownFromTable(postId).then(resp => {
            console.log('deleted post ' + postId);
            res.status(200).json(payload);
        }).catch(err => {
            res.status(500).json(tableError);
        });
    }).catch(err => {
        res.status(404).json(err);
    });
});


app.post('/api/markdown/submit', (req, res) => {
    let captchaResponse = req.headers['g-recaptcha-response'];
    if(!captchaResponse) {
        console.log('Header missing, user unauthenticated');
        res.status(401).send('Unauthenticated');
    }
   verifyCaptcha(captchaResponse, req.connection.remoteAddress).then(resp => {
        if (resp.data.success) {
            let id = helpers.generatePostId();
            let markdown = req.body['markdown'];
            database.saveMarkdownToTable(id, markdown).then(data => {
                res.status(200).json({postId: id});
            }, err => {
                console.log(err);
                res.status(500).json(err);
            });
        }
        else {
            res.status(403).send('Unauthorized');
        }
    }).catch(err => {
        res.status(401).send('Unauthenticated');
    });
});

console.log('starting server!');
app.listen(8080, 'localhost');

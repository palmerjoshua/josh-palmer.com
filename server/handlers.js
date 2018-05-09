const helpers = require('./helpers');
const database = require('./database');
const secretsPromise = require('serverless-secrets/client').load();


module.exports.getHandler = (event, context, callback) => {
    let response = helpers.getDefaultResponse();
    try {
        let body = JSON.parse(event.body);
        let postId = body.postId;
        if (!postId) {
            helpers.handleError({error: "Missing postId"}, response, callback, 400);
        }
        database.getMarkdownFromTable(postId, (err, data) => {
            if (err) {
                console.log("ERROR GETTING MARKDOWN FROM TABLE");
                helpers.handleError(err, response, callback);
            } else {
                console.log(data.Item);
                let payload = data.Item;
                if (data.Item === undefined) {
                    helpers.handleError({error: "Not Found"}, response, callback, 404)
                } else {
                    let postId = payload.id;
                    database.deleteMarkdown([postId], err => {
                        if (err) {
                            console.log("ERROR DELETING MARKDOWN FROM TABLE");
                            helpers.handleError(err, response, callback);
                        } else {
                            response.body = JSON.stringify(payload);
                            callback(null, response);
                        }
                    });
                }

            }
        });
    } catch (e) {
        helpers.handleError(e, response, callback);
    }
};


module.exports.postHandler = (event, context, callback) => {
    let response = helpers.getDefaultResponse();
    try {
        secretsPromise.then(() => {
            let secret = process.env.CAPTCHA_SECRET_KEY;
            let body = JSON.parse(event.body);
            let markdown = body.markdown;
            let auth = body.captchaResponse;
            let ip = event["requestContext"]["identity"]["sourceIp"];
            helpers.verifyCaptcha(auth, ip, secret).then((resp) => {
                console.log(resp);
                if (!resp.data.success) {
                    console.log("FAILED TO VERIFY CAPTCHA");
                    console.log(resp);
                    helpers.handleError("Unauthenticated", response, callback, 401);

                } else if (!helpers.testHost(resp.data.hostname)){
                    console.log("HOSTNAME: ", resp.data.hostname);
                    console.log("ALLOWED: ", process.env.ALLOWED_ORIGIN);
                    helpers.handleError("Unauthenticated", response, callback, 401)

                } else {
                    let id = helpers.generatePostId();
                    database.saveMarkdownToTable(id, markdown, err => {
                        if (err) {
                            helpers.handleError(err, response, callback);
                        } else {
                            response.body = JSON.stringify({postId: id});
                            callback(null, response);
                        }
                    });
                }

            }).catch(err => {
                console.log("EXCEPTION WHEN VERIFYING CAPTCHA");
                console.log(err);
                helpers.handleError(err, response, callback);
            });

        }).catch(err => {
            console.log("EXCEPTION WHEN GETTING SECRETS");
            console.log(err);
            helpers.handleError(err, response, callback);
        });
    } catch (e) {
        console.log("UNKNOWN EXCEPTION");
        console.log(e);
        helpers.handleError(e, response, callback);
    }
};


module.exports.cleanupHandler = (event, context, callback) => {
    console.log("Table cleanup started at: ", Date.now());
    database.getMarkdownToDelete((err, data) => {
        if (err) {
            console.log("Error cleaning up table");
            console.log(err);
            callback(err, null);
        } else {
            database.deleteMarkdown(data.Items.map(item => item.id), (err) => {
                if (err) {
                    console.log("Error cleaning up table");
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, {message: 'cleanup complete'});
                }
            });
        }
    });
};

const helpers = require('./helpers');
const database = require('./database');
const secretsPromise = require('serverless-secrets/client').load();

module.exports.fetchHandler = (event, context, callback) => {
    let response = helpers.getDefaultResponse();
    try {
        let body = JSON.parse(event.body);
        let postId = body.postId;
        if (!postId) {
            helpers.handleError({error: "Missing postId"}, response, callback, 400);
        }
        database.getMarkdown(postId, (err, data) => {
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
                    let ids = [];
                    ids.push(postId);
                    database.deleteMarkdown(ids, err => {
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

module.exports.submitHandler = (event, context, callback) => {
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
                    console.log(`RECEIVED INVALID CAPTCHA FROM: ${ip}`);
                    console.log(resp);
                    helpers.handleError("Unauthenticated", response, callback, 401);

                } else if (!helpers.testHost(resp.data.hostname)){
                    console.log(`RECEIVED INVALID CAPTCHA FROM: ${ip}`);
                    console.log("HOSTNAME: ", resp.data.hostname);
                    helpers.handleError("Unauthenticated", response, callback, 401)

                } else {
                    let id = helpers.generatePostId();
                    database.putMarkdown(id, markdown, err => {
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

module.exports.flushHandler = (event, context, callback) => {
    console.log("Table cleanup started at: ", Date.now());
    database.getMarkdownToDelete((err, data) => {
        if (err) {
            console.log("Error cleaning up table");
            console.log(err);
            callback(err, null);
        } else {
            console.log(`Deleting ${data.Items.length} items`);
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

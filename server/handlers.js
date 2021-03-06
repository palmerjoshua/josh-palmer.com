const helpers = require('./helpers');
const database = require('./database');
const secretsPromise = require('serverless-secrets/client').load();


const authenticatedHandler = (event, context, callback, successFn, ...args) => {
    let response = helpers.getDefaultResponse();
    try {
        secretsPromise.then(() => {
            let secret = process.env.CAPTCHA_SECRET_KEY;
            let body = JSON.parse(event.body);
            let auth = body.captchaResponse;
            let ip = event["requestContext"]["identity"]["sourceIp"];

            helpers.verifyCaptcha(auth, ip, secret).then((resp) => {
                console.log(resp);
                if (!resp.data.success) {
                    console.log(`RECEIVED INVALID CAPTCHA FROM: ${ip}`);
                    console.log(resp);
                    helpers.handleError(null, response, callback, 401, "Unauthenticated");

                } else if (!helpers.testHost(resp.data.hostname)){
                    console.log(`RECEIVED INVALID CAPTCHA FROM: ${ip}`);
                    console.log("HOSTNAME: ", resp.data.hostname);
                    helpers.handleError(null, response, callback, 401, "Unauthenticated")

                } else {
                    successFn(...args);
                }

            }).catch(err => {
                console.log("EXCEPTION WHEN VERIFYING CAPTCHA");
                helpers.handleError(err, response, callback, 500, "CAPTCHA VERIFY FAILED");
            });

        }).catch(err => {
            console.log("EXCEPTION WHEN GETTING SECRETS");
            helpers.handleError(err, response, callback, 500, "CAPTCHA VERIFY FAILED");
        });

    } catch (e) {
        helpers.handleError(e, response, callback);
    }
};

module.exports.fetchHandler = (event, context, callback) => {
    authenticatedHandler(event, context, callback, () => {
        let response = helpers.getDefaultResponse();
        try {
            let body = JSON.parse(event.body);
            let postId = body.postId;
            if(!helpers.testPostIdPattern(postId)) {
                helpers.handleError({error: "Bad request"}, response, callback, 400, {error: "Bad request"});
            }
            database.getMarkdown(postId, (err, data) => {
                if (err) {
                    console.log("ERROR GETTING MARKDOWN FROM TABLE");
                    helpers.handleError(err, response, callback);
                } else {
                    console.log(data.Item);
                    let payload = data.Item;
                    if (data.Item === undefined) {
                        helpers.handleError({error: "Not Found"}, response, callback, 404, {error: "Bad request"})
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
    });
};

module.exports.submitHandler = (event, context, callback) => {
    try {
        let response = helpers.getDefaultResponse();
        let markdown = JSON.parse(event.body).markdown;
        let threshold = 4096;
        let payloadSize = Buffer.byteLength(markdown, 'utf-8');
        if (payloadSize > threshold) {
            // This is larger than most payloads will ever be because the UI has a 4096 character limit in the text area.
            helpers.handleError({error: `Payload too large. It must be <= ${threshold} bytes AFTER gzip compression.`}, response, callback, 413);
        }
        authenticatedHandler(event, context, callback, () => {
            let id = helpers.generatePostId();
            database.putMarkdown(id, markdown, err => {
                if (err) {
                    helpers.handleError(err, response, callback);
                } else {
                    response.body = JSON.stringify({postId: id});
                    callback(null, response);
                }
            });
        });
    } catch (e) {
        helpers.handleError(e, response, callback);
    }
};

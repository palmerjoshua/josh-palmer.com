let crypto = require('crypto');
const axios = require('axios');

const inProductionMode = () =>{return (process.env.DEPLOYMENT || 'local').toLowerCase() === 'prod';};

const DEFAULT_RESPONSE = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN,
        'Access-Control-Allow-Methods': "POST, OPTIONS",
        'Access-Control-Allow-Headers': "Content-Type, Accept, Origin"
    }
};

const getDefaultResponse = () => {
    return Object.assign({}, DEFAULT_RESPONSE);
};

const generatePostId = () => {
    return crypto.randomBytes(20).toString('hex');
};

const handleError = (error, response, callback, status = 500, msg = null) => {
    if (msg) {
        console.log(msg);
    }
    if (error) {
        console.log(error);
    }

    if (!inProductionMode()) {
        response.body = JSON.stringify(error);
    } else if (msg) {
        response.body = msg;
    } else {
        response.body = "UNKNOWN ERROR OCCURRED";
    }

    response.statusCode = status;
    callback(null, response);
};

const verifyCaptcha = (response, remoteip, captcha_secret) => {
    let baseUrl = 'https://www.google.com/recaptcha/api/siteverify',
        params = `?secret=${captcha_secret}&response=${response}&remoteip=${remoteip}`,
        url = `${baseUrl}${params}`,
        headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'};
    return axios({method: 'post', url: url, headers: headers});
};


const testHost = (hostToTest) => {
    let pat = /^(?:https?:\/\/)?([\w\-.]+)(?::\d{2,4})?(?:\/.*)?$/;
    let allowedDomain = pat.exec(process.env.ALLOW_ORIGIN)[1];
    return hostToTest.toLowerCase() === allowedDomain.toLowerCase();
};

const testPostIdPattern = (postId) => {
    let pat = /^([a-f0-9]{40})$/;
    let match;
    let toTest = postId || "";
    try {
        match = pat.exec(toTest)[1];
    } catch (e) {
        return false;
    }
    return match === postId;
};

module.exports = {
    inProductionMode,
    generatePostId,
    handleError,
    verifyCaptcha,
    getDefaultResponse,
    testHost,
    testPostIdPattern
};

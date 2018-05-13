const config = {
    google: {
        recaptcha: {
            site_key: 'your recaptcha site key'
        }
    },
    aws: {
        region: 'us-east-1',
        fetchUrl: 'http://localhost:4000/markdown/fetch',
        //fetchUrl: 'https://yourLambdaSubdomain.execute-api.us-east-1.amazonaws.com/dev/markdown/fetch',
        //submitUrl: 'https://yourLambdaSubdomain.execute-api.us-east-1.amazonaws.com/dev/markdown/submit'
        submitUrl: 'http://localhost:4000/markdown/submit'
    }
};

module.exports = config;

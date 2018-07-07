### Overview
* The server is a REST API and NoSQL database for [the main React app](../src/README.md).
* It combines Lambda, API Gateway, and DynamoDB.
* Deployment is fully automated using the Serverless Framework.
* Local Lambda and DynamoDB environments can be used for development.


### Dependencies
* `sls dynamodb install` - installs a local version of DynamoDB (only do this once)
* Get API access to Google reCaptcha
    * Save the site key to config.js
    * Save the secret key to secret.js

### Configure Secrets
Save the recaptcha secret key to EC2 Parameter Store using the [serverless-secrets plugin](https://github.com/trek10inc/serverless-secrets#usage-samples)


### Local Deployment
* Configure serverlessconfig.yml
    * Set the `stage` to `"local"`
    * Set the allowed `origin`
        * By default this is `http://localhost:3000`
        * This is the IP for the dev server that hosts the React app.
* `sls offline start` - create and run an offline version of Lambda and DynamoDB.
    * Lambda functions are served from `http://localhost:4000`
    * DynamoDB is served from `http://localhost:8000`

### AWS Deployment
* Configure serverlessconfig.yml
    * Set the `stage` to either `"dev"` or `"prod"`
    * Set the allowed `origin`
        * For dev environments, this may still be `http://localhost:3000`
        * For production environments, this should be `https://your-domain.com`
* `sls deploy` - Deploys the Lambda functions and DynamoDB table to AWS
* `sls remove` - Deletes all AWS resources created from the `deploy` command

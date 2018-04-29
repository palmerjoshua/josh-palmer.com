const config = require('../config');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'markdownTableWriter'});
const documentClient = new AWS.DynamoDB.DocumentClient();

const saveMarkdownToTable = (id, markdown) => {
    let params = {
        TableName: config.aws.tables.markdown.table_name,
        Item: {
            "id": id,
            "created_time": Date.now(),
            "markdown": markdown
        }
    };
    return documentClient.put(params).promise();
};


const getMarkdownFromTable = id => {
    let params = {
        TableName: config.aws.tables.markdown.table_name,
        Key: {
            "id": id
        }
    };
    return documentClient.get(params).promise();
};


const deleteMarkdownFromTable = id => {
    let params = {
        TableName: config.aws.tables.markdown.table_name,
        Key: {
            "id": id
        }
    };
    return documentClient.delete(params).promise();
};


module.exports = {saveMarkdownToTable, getMarkdownFromTable, deleteMarkdownFromTable};

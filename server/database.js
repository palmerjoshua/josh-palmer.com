

const AWS = require('aws-sdk');

const documentClient = (() => {
    let client;
    if (process.env.DEPLOYMENT === 'local') {
        client = new AWS.DynamoDB.DocumentClient({region: 'localhost', endpoint: 'http://localhost:8000'});
    } else {
        AWS.config.update({region: process.env.REGION});
        client = new AWS.DynamoDB.DocumentClient();
    }
    return client;
})();


const TABLE_NAME = process.env.TABLE;

const saveMarkdownToTable = (id, markdown, callback) => {
    let params = {
        TableName: TABLE_NAME,
        Item: {
            "id": id,
            "created_time": Date.now(),
            "markdown": markdown
        }
    };
    return documentClient.put(params, callback);
};


const getMarkdownParams = (id) => {
    return {
        TableName: TABLE_NAME,
        Key: {
            "id": id
        }
    };
};


const getMarkdownFromTable = (id, callback) => {
    return documentClient.get(getMarkdownParams(id), callback);
};


const deleteMarkdownFromTable = (id, callback) => {
    return documentClient.delete(getMarkdownParams(id), callback);
};


module.exports = {saveMarkdownToTable, getMarkdownFromTable, deleteMarkdownFromTable};

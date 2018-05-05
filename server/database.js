const AWS = require('aws-sdk');

AWS.config.update({region: process.env.REGION});
const client = new AWS.DynamoDB.DocumentClient();
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
    return client.put(params, callback);
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
    return client.get(getMarkdownParams(id), callback);
};


const deleteMarkdownFromTable = (id, callback) => {
    return client.delete(getMarkdownParams(id), callback);
};


module.exports = {saveMarkdownToTable, getMarkdownFromTable, deleteMarkdownFromTable};

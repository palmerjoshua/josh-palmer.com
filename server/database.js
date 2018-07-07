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

const putMarkdown = (id, markdown, callback) => {
    let params = {
        TableName: TABLE_NAME,
        Item: {
            "id": id,
            "ttl": Math.floor(Date.now() / 1e3) + 2592000, // 30 days from now
            "markdown": markdown
        }
    };
    return documentClient.put(params, callback);
};

const getMarkdownParams = id => {
    return {
        TableName: TABLE_NAME,
        Key: {
            "id": id
        }
    };
};

const getDeleteParams = postIds => {
    let deleteRequests = postIds.map(id => ({DeleteRequest: {Key: {id}}}));
    return {RequestItems: {[TABLE_NAME]: deleteRequests}};
};

const getMarkdown = (id, callback) => {
    return documentClient.get(getMarkdownParams(id), callback);
};

const deleteMarkdown = (postIds, callback) => {
    documentClient.batchWrite(getDeleteParams(postIds), callback)
};

module.exports = {putMarkdown, getMarkdown, deleteMarkdown};

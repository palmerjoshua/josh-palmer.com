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
            "created_time": Date.now(),
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


const getCleanupScanParams = (cleanupThreshold = 0) => {
    if (!cleanupThreshold) {
        cleanupThreshold = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).getTime(); // 24 hours
    }
    return {
        TableName: TABLE_NAME,
        FilterExpression: "created_time < :threshold",
        ExpressionAttributeValues: {":threshold": cleanupThreshold}
    };
};


const getDeleteParams = postIds => {
    let deleteRequests = postIds.map(id => ({DeleteRequest: {Key: {id}}}));
    return {RequestItems: {[TABLE_NAME]: deleteRequests}};
};


const getMarkdown = (id, callback) => {
    return documentClient.get(getMarkdownParams(id), callback);
};


const getMarkdownToDelete = callback => {
    return documentClient.scan(getCleanupScanParams(), callback);
};


const deleteMarkdown = (postIds, callback) => {
    documentClient.batchWrite(getDeleteParams(postIds), callback)

};


module.exports = {putMarkdown, getMarkdown, getMarkdownToDelete, deleteMarkdown};

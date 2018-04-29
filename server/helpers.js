let crypto = require('crypto');

const generatePostId = () => {
    return crypto.randomBytes(20).toString('hex');
};

module.exports = {
    generatePostId: generatePostId
};

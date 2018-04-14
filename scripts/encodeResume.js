(() => {
    let fs = require('fs');

    const getB64String = () => {
        return fs.readFileSync('./assets/resume.pdf').toString('base64');
    };

    const getConfigTemplate = () => {
        return fs.readFileSync('./src/client/components/resume/data/resumeb64.example.js').toString('utf8');
    };

    const getConfig = () => {
        return getConfigTemplate().replace("#{resumeData}", getB64String());
    };

    const writeConfig = () => {
        fs.writeFileSync('./src/client/components/resume/data/resumeb64.js', getConfig());
    };

    writeConfig();
})();

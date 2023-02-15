// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const oldConfig = require('./docusaurus.config');

const config = {
    ...oldConfig,
    baseUrl: '/write-you-a-typescript/',
};

module.exports = config;

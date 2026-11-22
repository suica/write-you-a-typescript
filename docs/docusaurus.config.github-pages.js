// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const createConfig = require('./docusaurus.config');

module.exports = async function createPagesConfig() {
    return {
        ...(await createConfig()),
        baseUrl: '/write-you-a-typescript/',
    };
};

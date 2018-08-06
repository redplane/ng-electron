module.exports = (ngModule) => {
    ngModule.config((blockUIConfig) => {
        blockUIConfig.autoBlock = false;
        blockUIConfig.autoInjectBodyBlock = false;
        blockUIConfig.blockBrowserNavigation = true;
    });
};
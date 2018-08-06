exports = module.exports = (paths, argv) => {
    // Get shared feature.
    const shared = require('../shared/plugin')(paths, argv);

    //#region Methods

    return {
        get: () => {
            // Plugins list.
            let plugins = [];

            // Get common plugins.
            let sharedPlugins = shared.getCommonPlugins();

            // Concatenate plugins list.
            plugins = plugins.concat(sharedPlugins);

            return plugins;
        }
    }
    //#endregion
};
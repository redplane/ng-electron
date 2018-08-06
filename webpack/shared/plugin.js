module.exports = (paths, argv) => {

    // Import webpack.
    const webpack = require('webpack');

    return {

        /*
        * Get list of common plugins.
        * */
        getCommonPlugins: () => {

            let plugins = [];

            //#region Define plugin

            // Shared environment configurations.
            let sharedEnvProperties = {
                PATHS: JSON.stringify(paths)
            };

            // Environment properties.
            let env = {};

            // In production mode.
            if (argv.production)
                env = Object.assign({}, require('./env/production')(paths, argv), sharedEnvProperties);
            else
                env = Object.assign({}, require('./env/development')(paths, argv), sharedEnvProperties);

            plugins.push(new webpack.DefinePlugin(env));

            //#endregion

            //#region Ignore plugin

            plugins.push(new webpack.IgnorePlugin(/vertx/));
            plugins.push(new webpack.IgnorePlugin(/bufferutil/));
            plugins.push(new webpack.IgnorePlugin(/spawn-sync/));
            plugins.push(new webpack.IgnorePlugin(/utf-8-validate/));

            //#endregion


            return plugins;
        }
    };
};
exports = module.exports = (paths, argv) => {

    // Import node module.
    const path = require('path');

    // Get shared feature.
    const shared = require('../shared/plugin')(paths, argv);

    // Import webpack.
    const webpack = require('webpack');

    // Import plugins.
    const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    //#region Methods

    return {
        get: () => {
            // Plugins list.
            let plugins = [];

            // Get common plugins.
            let sharedPlugins = shared.getCommonPlugins();

            // Concatenate plugins list.
            plugins = plugins.concat(sharedPlugins);

            //#region Provide plugin

            // Using bluebird promise instead of native promise.
            plugins.push(new webpack.ProvidePlugin({
                // Promise: 'bluebird',
                moment: 'moment',
                jQuery: 'jquery',
                $: 'jquery',
                Tether: 'tether',
                mCustomScrollbar: 'malihu-custom-scrollbar-plugin',
                'require.specified': 'require.resolve'
            }));

            //#endregion

            //#region Html plugin

            plugins.push(new HtmlWebpackPlugin({
                filename: path.join(paths.build, 'index.html'),
                template: path.join(paths.src, 'index.html'),
                chunksSortMode: 'dependency',
                minify:{
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true
                }
            }));

            //#endregion

            //#region Annotate plugin

            if (argv.production){
                // Annotate plugin.
                plugins.push(new ngAnnotatePlugin({add: true}));
            }

            //#endregion
            
            return plugins;
        }
    }
    //#endregion
};
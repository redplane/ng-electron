exports = module.exports = (paths, argv) => {
    const path = require('path');

    /*
    * Module export.
    * */
    return {
        target: 'electron-renderer',
        mode: argv.production ? 'production' : 'development',
        context: paths.root,
        devtool: !argv.production ? 'source-map' : false,
        entry: {
            'app': path.resolve(paths.renderer, 'app.js')
        },
        optimization: {
            runtimeChunk: false,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    default: {
                        enforce: true,
                        priority: 1
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: 2,
                        name: 'vendors',
                        enforce: true,
                        chunks: 'async'
                    }
                }
            }
        },
        module: {
            rules: require('./rule')(paths, argv).get()
        },
        plugins: require('./plugin')(paths, argv).get(),
        output: {
            path: paths.build,
            filename: '[name].[hash].js'
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".ts", ".tsx", ".js"],
            alias: {
                'CodeMirror': 'codemirror',
            }
        },
        watch: !argv.production,
        watchOptions: {
            poll: false
        },
        externals: {
            sqlite3: 'commonjs sqlite3'
        }
    };
};
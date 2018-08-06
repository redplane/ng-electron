exports = module.exports = (paths, argv) => {

    // Import node libs.
    return {
        target: 'electron-main',
        mode: argv.production ? 'production' : 'development',
        context: paths.root,
        devtool: !argv.production ? 'source-map' : false,
        optimization: {
            runtimeChunk: false,
            splitChunks: {
                chunks: 'async',
                cacheGroups: {
                    default: {
                        enforce: true,
                        priority: 1
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: 2,
                        name: 'main-vendors',
                        enforce: true
                    }
                }
            }
        },
        module: {
            rules: require('./rule')(paths, argv).get(),

        },
        plugins: require('./plugin')(paths, argv).get(),
        output: {
            filename: '[name].js'
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".ts", ".tsx", ".js"]
        },
        watch: !argv.production,
        watchOptions:{
            poll: false
        },
        node: {
            __filename: true,
            __dirname: true
            // __dirname: false,
            // __filename: false
        },
        externals: {
            'node-notifier': 'commonjs node-notifier'
        }
    };
};
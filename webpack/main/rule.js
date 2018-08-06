// Import library.
exports = module.exports = (paths, argv) => {

    return {
        /*
        * Get configuration options.
        * */
        get: () => {

            let rules = [];

            //#region Ts loader

            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            rules.push({
                test: /\.tsx?$/,
                loader: "babel-loader!ts-loader"
            });

            //#endregion

            //#region Babel loader

            rules.push({
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['env', {"modules": false}]]
                    }
                }
            });

            //#endregion

            //#endregion
            //#endregion

            return rules;
        }
    }
};


module.exports = (paths, argv) => {

    // Get shared features.
    const shared = require('./shared')(paths, argv);
    const features = shared.getCommonFeatures();

    // Import gulp.
    const gulp = require('gulp');
    let bIsServerInitialized = false;

    let iReloadServerTask = null;
    let iRestartServerTask = null;
    let iInterval = 300;

    let instance = {
        /*
        * Watch main.js file.
        * */
        run: () => {

            /*
            * Clean publish folder.
            * */
            gulp.task('clean-publish-folder', () => {
                return shared
                    .deleteFolder(paths.build);
            });

            /*
            * Main task, this task builds the application source code.
            * */
            gulp.task('build-source-code', ['clean-publish-folder'], (callback) => {

                // List of promises that needs being done.
                let pPromises = [];

                //#region Build main file

                let pBuildMainPromise = new Promise(resolve => {
                    shared
                        .buildMain(() => {
                            console.log('Main file has been built.');
                            let server = features.eServer;
                            console.log(`Renderer file has been built. Server is restarted if it is active.`);
                            if (bIsServerInitialized) {
                                if (iRestartServerTask){
                                    clearTimeout(iRestartServerTask);
                                    iRestartServerTask = null;
                                }

                                iRestartServerTask = setTimeout(() => {
                                    server.restart();
                                    iRestartServerTask = null;
                                }, iInterval);

                            }
                            resolve();
                        });
                });
                pPromises.push(pBuildMainPromise);

                //#endregion

                //#region Build renderer file

                let pBuildRendererPromise = new Promise(resolve => {
                    shared
                        .buildRenderer(() => {
                            let server = features.eServer;
                            console.log(`Renderer file has been built. Server is reloaded if it is active.`);
                            if (bIsServerInitialized) {
                                if (bIsServerInitialized) {
                                    if (iReloadServerTask){
                                        clearTimeout(iReloadServerTask);
                                        iReloadServerTask = null;
                                    }

                                    iReloadServerTask = setTimeout(() => {
                                        server.reload();
                                        iReloadServerTask = null;
                                    }, iInterval);
                                }
                            }
                            resolve();
                        });
                });
                pPromises.push(pBuildRendererPromise);

                //#endregion

                //#region Build package file

                let pBuildPackagePromise = new Promise(resolve => {
                    shared.buildPackage()
                        .on('end', resolve);
                });

                pPromises.push(pBuildPackagePromise);

                //#endregion

                //#region Build assets

                let pBuildAssetsPromise = new Promise(resolve => {
                    shared.buildAssets(false)
                        .on('end', resolve);
                });

                pPromises.push(pBuildAssetsPromise);

                //#endregion

                return Promise.all(pPromises)
                    .then(() => callback);
            });

            /*
            * Task which is run automatically.
            * */
            gulp.task('default', ['build-source-code'], () => {
                setTimeout(() => {
                    // Open electron connect.
                    features.eServer.start();

                    // Initialize watchers.
                    instance.addWatchers();

                    bIsServerInitialized = true;
                }, 1000)
            });
        },

        /*
        * Initialize watchers to watch for source file changes.
        * */
        addWatchers: () => {
            shared.buildAssets(true);
        }
    };

    return instance;
};


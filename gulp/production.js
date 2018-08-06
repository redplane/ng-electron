module.exports = (paths, argv) => {

    // Get shared features.
    const shared = require('./shared')(paths, argv);

    // Import gulp.
    const gulp = require('gulp');

    return {

        run: () => {

            gulp.task('clean-publish-folder', () => {
                return shared
                    .deleteFolder(paths.build)
            });

            /*
            * Task that will be run automatically.
            * */
            gulp.task('default', ['clean-publish-folder'], () => {

                // List of promises that must be resolves.
                let promises = [];

                //#region Build main file promise.

                // Build main file promise.
                let pBuildMainFilePromise = new Promise((resolve, reject) => {
                    shared.buildMain()
                        .on('end', resolve);
                });

                promises.push(pBuildMainFilePromise);

                //#endregion

                //#region Build package file.

                let pBuildPackageFilePromise = new Promise((resolve, reject) => {
                    shared.buildPackage()
                        .on('end', resolve);
                });

                promises.push(pBuildPackageFilePromise);

                //#endregion

                //#region Build renderer files.

                let pBuildRendererFilePromise = new Promise((resolve, reject) => {
                    shared.buildRenderer()
                        .on('end', resolve);
                });

                promises.push(pBuildRendererFilePromise);

                //#endregion

                //#region Build assets

                let pBuildAssetsPromise = new Promise(resolve => {
                    shared
                        .buildAssets(false)
                        .on('end', resolve);
                });

                promises.push(pBuildAssetsPromise);

                //#endregion

                Promise.all(promises)
                    .then(() => {
                        console.log('All done');
                    });
            });
        }
    }
};


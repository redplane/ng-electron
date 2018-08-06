const electronConnect = require('electron-connect');

const path = require('path');
const gulp = require('gulp');
const gulpJsonEditor = require('gulp-json-editor');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const gulpClean = require('gulp-clean');
const gulpWatch = require('gulp-watch');

module.exports = (paths, argv) => {

    // Get renderer webpack configuration.
    const renderer = require('../webpack/renderer')(paths, argv);
    const main = require('../webpack/main')(paths, argv);

    // Initialize electron connect server.
    const electronConnectServer = electronConnect.server.create({
        path: paths.build
    });

    const features = {
        eServer: electronConnectServer
    };

    return {
        /*
        * Get shared features between development & production.
        * */
        getCommonFeatures: () => {
            return features;
        },

        /*
        * Build renderer code.
        * */
        buildRenderer: (callback) => {
            const entryRenderer = path.join(paths.renderer, 'app.js');
            return gulp.src(entryRenderer)
                .pipe(webpackStream(renderer, webpack, () => {
                    if (callback)
                        callback();
                }))
                .pipe(gulp.dest(paths.build));
        },

        /*
        * Build main file.
        * */
        buildMain: (callback) => {
            let pEntry = path.resolve(paths.src, 'main.js');
            return gulp
                .src(pEntry)
                .pipe(webpackStream(main, webpack, () => {
                    if (callback)
                        callback();
                }))
                .pipe(gulp.dest(paths.build));
        },

        /*
        * Build package file.
        * */
        buildPackage: () => {
            const entryPackage = path
                .join(paths.root, 'package.json');
            return gulp.src(entryPackage)
                .pipe(gulpJsonEditor((json) => {
                    delete json.repository;
                    delete json.scripts;
                    json.main = 'main.js';
                    return json;
                }))
                .pipe(gulp.dest(paths.build))
        },

        /*
        * Copy static assets to build folder.
        * */
        buildAssets: (addWatch) => {
            let entries = [];
            entries.push(path.resolve(paths.src, 'assets', '**', '*'));
            entries.push(path.resolve(paths.src, 'resources', '**', '*'));
            let pPipe = gulp
                .src(entries, {base: paths.src});
            if (addWatch) {
                pPipe = pPipe
                    .pipe(gulpWatch(entries, {base: paths.src}));
            }

            return pPipe
                .pipe(gulp.dest(paths.build));
        },

        /*
        * Delete specific folder.
        * */
        deleteFolder: (folder) => {
            return gulp.src(folder, {read: false, force: true})
                .pipe(gulpClean());
        }
    };
};
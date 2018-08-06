// Get command arguments.
const argv = require('yargs').argv;

// NodeJS api import.
const path = require('path');

// Path which contains source code.
const pRoot = path.resolve(__dirname);
const pSourceCode = path.join(__dirname, 'src');
const pRenderer = path.join(pSourceCode, 'renderer');
const pMain = path.join(pSourceCode, 'main');
const pBuild = path.join(__dirname, 'build');
const pServiceWorker = path.join(pSourceCode, 'service-workers');

// List of paths.
const paths = {
    root: pRoot,
    src: pSourceCode,
    renderer: pRenderer,
    main: pMain,
    build: pBuild,
    serviceWorker: pServiceWorker
};

// Access environment variable.
let mode = argv.mode;
if (!mode || mode.length < 1)
    mode = 'development';

// Get production state.
const bIsInProductionMode = (mode && mode.toLowerCase() === 'production');
argv.production = bIsInProductionMode;

if (!bIsInProductionMode) {
    const gulpDevelopment = require('./gulp/development')(paths, argv);
    gulpDevelopment.run();
} else {
    const gulpProduction = require('./gulp/production')(paths, argv);
    gulpProduction.run();
}
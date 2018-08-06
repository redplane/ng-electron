// Libraries import.
const electron = require('electron');
const {Tray, Menu} = require('electron');
const ipcMain = require('electron').ipcMain;

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Import shared information between renderer and main.
const pSharedProcessEvent = require('./shared/constants/event');

// Import path.
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;

//#region Events

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

    //#region Main window initialization

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 600,
        webPreferences: {
            devTools: true
        }
    });

    // and load the index.html of the app.
    let fileName = '';

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // In production mode.
    if (IS_PRODUCTION) {
        let appPath = app.getAppPath();
        fileName = path.join(appPath, 'index.html');
    }
    else {
        fileName = path.join(PATHS.build, 'index.html');

    }

    mainWindow
        .loadURL(url.format({
            pathname: fileName,
            protocol: 'file:',
            slashes: true
        }));

    // Environment is development.
    if (!IS_PRODUCTION) {
        // Connect to electron connect.
        const electronConnect = require('electron-connect');
        const client = electronConnect.client;
        client.create(mainWindow);
    }

    // Import window event constants.


    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // Called when window is lost focus.
    mainWindow
        .on('blur', () => {
            mainWindow.send(pSharedProcessEvent.EVENT_BLUR)
        });

    // Called when window is focused.
    mainWindow
        .on('focus', () => {
            mainWindow.send(pSharedProcessEvent.EVENT_FOCUS);
        });

    //#endregion
});

/*
* Quit when all windows are closed.
* */
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

/*
* Called when window is activated.
* */
app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

//#endregion

//#region Message handler

/*
* Called when a push notification is received by renderer process and passed to main.
* */
ipcMain
    .on(pSharedProcessEvent.EVENT_NOTIFICATION_RECEIVED, (event, arg) => {
        // Tray menu is not defined.
        if (!arg)
            return;

        let options = {};
        options['appName'] = 'com.personal-cv.001';
        if (arg.title)
            options['title'] = arg.title;

        if (arg.message)
            options['message'] = arg.message;

        console.log(options);
    });
//#endregion

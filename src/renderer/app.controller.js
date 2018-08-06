module.exports = (ngModule) => {

    // Import ipc renderer.
    const ipcRenderer = require('electron').ipcRenderer;
    const pSharedProcessEvents = require('../shared/constants/event');

    /*
    * Application controller definition.
    * */
    ngModule.controller('appController', ($ui, $translate,
                                          apiUrlConstant,
                                          $scope) => {

        //#region Properties

        /*
        * Whether application main window is being focused or not.
        * */
        $scope.bIsWindowFocused = false;

        //#endregion

        //#region Methods

        /*
        * Called when app instance is initialized.
        * */
        $scope.ngOnInit = () => {

        };

        /*
        * Called when window is focused.
        * */
        $scope.ngOnWindowFocused = () => {
            $scope.bIsWindowFocused = true;
        };

        /*
        * Called when window is blurred.
        * */
        $scope.ngOnWindowBlurred = () => {
            $scope.bIsWindowFocused = false;
        };

        //#endregion

        //#region Events

        /*
        * Called when main window's focus is lost.
        * */
        ipcRenderer
            .on(pSharedProcessEvents.EVENT_BLUR, $scope.ngOnWindowBlurred);

        /*
        * Called when main window is focused.
        * */
        ipcRenderer
            .on(pSharedProcessEvents.EVENT_FOCUS, $scope.ngOnWindowFocused);

        //#endregion
    });
};
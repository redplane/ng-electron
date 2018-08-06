module.exports = (ngModule) => {
    ngModule.controller('appMasterLayoutController', (
        $ui,
        $scope, $timeout) => {


        //#region Methods

        /*
        * Called when component is initialized.
        * */
        $scope.ngOnInit = () => {
            $ui.initSlimScrollbar('nav.side-navbar');
        };

        //#endregion
    });
};
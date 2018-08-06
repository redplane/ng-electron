module.exports = (ngModule) => {
    ngModule.controller('dashboardController', (
        urlStatesConstant, cacheKeyConstant,
        $appCache,
        $translate,
        $uibModal, $state, $ui, $ngConfirm,
        $timeout,
        $scope) => {

        //#region Properties

        // Constants reflection.
        $scope.urlStatesConstant = urlStatesConstant;

        // User information to watch.
        $scope.user = null;

        // List of user descriptions.
        $scope.userDescriptions = [];

        // List of user categories.
        $scope.technicalSkills = [];

        // List of user projects.
        $scope.userProjects = [];

        // List of modals instance.
        $scope.oModals = {
            userPicker: null,
            avatarPicker: null
        };

        //#endregion

        //#region Methods

        /*
        * Called when component is initialized.
        * */
        $scope.ngOnInit = () => {
        };

        //#endregion
    });
};
module.exports = (ngModule) => {
    // Directive declaration.
    ngModule.directive('sideBar', ($ui, $state, $compile, $q) => {
        return {
            restrict: 'E',
            transclude: {},
            compile: () => {
                let pGetTemplatePromise = $q((resolve) => {
                    require.ensure([], () => resolve(require('./side-bar.html')));
                });

                return (scope, element) => {
                    pGetTemplatePromise
                        .then((htmlTemplate) => {
                            element.html(htmlTemplate);
                            $compile(element.contents())(scope)
                        });
                };
            },
            scope: {},
            controller: (
                urlStatesConstant,
                $scope, $timeout) => {

                //#region Properties

                // Constants relection.
                $scope.urlStatesConstant = urlStatesConstant;

                //#endregion

                //#region Methods

                // Called when directive is initialized.
                $scope.ngOnInit = () => {

                };

                /*
                * Check whether current state contain a specific state or not.
                * */
                $scope.bContainState = (stateName) => {
                    return $state.includes(stateName);
                };

                /*
                * Called automatically when component is initialized.
                * */
                $timeout(() => {
                    $ui.addSlimScrollbar('nav.side-navbar', {
                        scrollInertia: 200
                    });
                });
                //#endregion
            }
        }
    });
};
module.exports = (ngModule) => {

    // Directive declaration.
    ngModule.directive('navigationBar', ($compile, $q) => {
        return {
            restrict: 'E',
            transclude: {},
            compile: () => {
                let pGetTemplatePromise = $q((resolve) => {
                    require.ensure([], () => resolve(require('./navigation-bar.html')));
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
            controller: ($ui,
                         $element, $window,
                         $scope) => {

                //#region Methods

                /*
                * Called when component is initialized.
                * */
                $scope.ngOnInit = () => {

                };

                /*
                * Called when toggle sidebar button is clicked.
                * */
                $scope.toggleSidebar = () => {
                    if ($window.outerWidth > 1194) {
                        $ui.findDomElement('nav.side-navbar').toggleClass('shrink');
                        $ui.findDomElement('.page').toggleClass('active');
                        return;
                    }

                    $ui.findDomElement('nav.side-navbar').toggleClass('show-sm');
                    $ui.findDomElement('.page').toggleClass('active-sm');
                };

                //#endregion
            }
        }
    });
};
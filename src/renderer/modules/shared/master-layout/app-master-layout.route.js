module.exports = (ngModule) => {
    // Route configuration.
    ngModule.config(($stateProvider, urlStatesConstant) => {
        //#region State configuration
        const urlStateShared = urlStatesConstant.shared;
        const urlStateAppMasterLayout = urlStateShared.masterLayout;

        $stateProvider.state(urlStateAppMasterLayout.name, {
            abstract: true,
            controller: 'appMasterLayoutController',
            templateProvider: ($q) => {
                return $q((resolve) => {
                    // lazy load the view
                    require.ensure([], () => resolve(require('./app-master-layout.html')));
                });
            },
            resolve:{
                loadAppMasterLayoutController: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load only controller module
                            let module = angular.module('shared.master-layout', []);
                            require('./app-master-layout.controller')(module);
                            $ocLazyLoad.load({name: module.name});
                            resolve(module.controller);
                        })
                    });
                }
            }
        });

        //#endregion

    });
};
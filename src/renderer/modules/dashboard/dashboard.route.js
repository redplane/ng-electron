module.exports = (ngModule) => {
    // Route configuration.
    ngModule.config(($stateProvider, urlStatesConstant) => {

        //#region State configuration
        const urlStateDashboard = urlStatesConstant.dashboard;
        const urlStateShared = urlStatesConstant.shared;

        $stateProvider.state(urlStateDashboard.name, {
            url: urlStateDashboard.url,
            templateProvider: ($q) => {
                return $q((resolve) => {
                    // lazy load the view
                    require.ensure([], () => resolve(require('./dashboard.html')));
                });
            },
            parent: urlStateShared.masterLayout.name,
            controller: 'dashboardController',
            resolve: {
                loadDashboardController: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load only controller module
                            let module = angular.module('dashboard', []);
                            require('./dashboard.controller')(module);
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
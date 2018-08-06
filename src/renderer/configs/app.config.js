module.exports = (ngModule) => {
    ngModule.config(($urlRouterProvider, urlStatesConstant) => {
        $urlRouterProvider.otherwise(($injector) => {
            const $state = $injector.get('$state');
            if (!$state)
                return;

            $state.go(urlStatesConstant.dashboard.name);
        });
    });
};
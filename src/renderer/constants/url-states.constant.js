module.exports = (ngModule) => {

    /*
    * Application constants declaration.
    * */
    ngModule.constant('urlStatesConstant', {
        login: {
            url: '/login',
            name: 'login'
        },

        dashboard: {
            url: '/dashboard',
            name: 'dashboard'
        },

        shared: {
            masterLayout: {
                name: 'app-master-layout',
                url: null
            }
        }
    });
};
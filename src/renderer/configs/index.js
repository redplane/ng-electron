module.exports = (ngModule) => {
    require('./angular-translate.config')(ngModule);
    require('./ng-block-ui.config')(ngModule);
    require('./app.config')(ngModule);
};

module.exports = (ngModule) => {
    /*
    * Constants declaration.
    * */
    require('./app-settings.constant')(ngModule);
    require('./url-states.constant')(ngModule);
    require('./cache-factory.constant')(ngModule);
    require('./cache-key.constant')(ngModule);
};
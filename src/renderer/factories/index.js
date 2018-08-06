module.exports = (ngModule) => {
    require('./api-interceptor.factory')(ngModule);
    require('./app-cache.factory')(ngModule);
};
module.exports = (ngModule) => {
    require('./app.css');
    require('./dashboard')(ngModule);
    require('./shared')(ngModule);
};
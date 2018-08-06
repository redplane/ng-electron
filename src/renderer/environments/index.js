module.exports = (ngModule) => {
    if (IS_PRODUCTION){
        require('./production')(ngModule);
        return;
    }

    require('./development')(ngModule);
};
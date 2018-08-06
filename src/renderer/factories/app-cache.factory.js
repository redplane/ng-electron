module.exports = (ngModule) => {
    ngModule.factory('$appCache', (cacheFactoryConstant,
                                   $cacheFactory) => {
        return $cacheFactory(cacheFactoryConstant.default);
    });
};
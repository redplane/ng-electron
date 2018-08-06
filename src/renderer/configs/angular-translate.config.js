module.exports = (ngModule) => {
    ngModule.config(($translateProvider) => {
        // Translation config.
        $translateProvider.useStaticFilesLoader({
            prefix: './assets/i18n/',
            suffix: '.json'
        });

        // en-US is default selection.
        $translateProvider.use('en-US');
    });
};
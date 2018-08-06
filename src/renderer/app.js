// Import font-awesome.
require('../../node_modules/font-awesome/scss/font-awesome.scss');

// Import bootstrap 4.
require('../../node_modules/bootstrap/scss/bootstrap.scss');
require('../../node_modules/angular-confirm1/css/angular-confirm.css');
require('../../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css');
require('../../node_modules/angular-moment-picker/dist/angular-moment-picker.min.css');
require('../../node_modules/angular-toastr/dist/angular-toastr.css');

// Application style (applied to whole application)
require('./app.scss');

// Import scss styles.
require('./styles/index.scss');

// Import JQuery & plugins.
require('jquery');
require('moment');
require('tether');
require('popper.js');
require('bootstrap');
require('jquery-mousewheel');
require('malihu-custom-scrollbar-plugin');

// Import angularjs and plugins.
const angular = require('angular');
require('@uirouter/angularjs');
require('oclazyload');
require('angular-block-ui');
require('angular-moment');
require('angular-toastr');
require('ui-bootstrap4');
require('angular-translate');
require('angular-translate-loader-static-files');
require('angular-file-upload');
require('angular-messages');
require('angular-sanitize');
require('angular-moment-picker');
require('angular-confirm1');

// App declaration.
const ngModule = angular.module('ngApp', [
    'ui.router', 'oc.lazyLoad',
    'ui.bootstrap', 'cp.ngConfirm',
    'blockUI', 'toastr',
    'angularMoment',
    'pascalprecht.translate', 'angularFileUpload', 'ngSanitize',
    'ngMessages', 'moment-picker']);

// Import application entity.
require('./models')();

// Import application controller.
require('./app.controller')(ngModule);

// Import services.
require('./services')(ngModule);

// Import app configs.
require('./configs')(ngModule);

// Import angular modules.
require('./modules')(ngModule);

// Import directives.
require('./directives')(ngModule);

// Import factories.
require('./factories')(ngModule);

// Import constants
require('./constants')(ngModule);

// Import environmental variable.
require('./environments')(ngModule);



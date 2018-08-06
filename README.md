## ng-structure

Description:

 * This is a simple structure of an AngularJS application. This project is integrated with Webpack for files bundling & live reload.
 * Language supported : 
    * ES2015, ES6 (using `babel-loader`).
    * Sass (using `scss-loader`)
    
 * Polyfill:
    * `bluebird` for `Promise`. 

**Online demo can be found** [here](http://localhost:8000/#!/):

#### Project structure.
```
.
+-- src
    +-- app
    |   +-- assets
    |   +-- configs
    |   +-- constants
    |   +-- directives
    |   +-- environments
    |   +-- factories
    |   +-- models
    |   +-- modules
    |       +-- dashboard
               |-- dashboard.controller.js
               |-- dashboard.route.js
               |-- dashboard.html
               |-- dashboard.css (or dashboard.scss)
               |-- index.js
            + index.js
    |   +-- services
    |   +-- styles
    |   +-- app.scss
    |   +-- app.js
    +-- index.html (Index file)
```

#### Structure description.
- ```assets``` : Static files (such as: *.css, *.json, ...) should be stored in this folder.
- ```configs``` : Contains angular plugin configuration (providers, etc ...).
- ```constants```: Appliation constant files should be stored in this folder (such as: app-settings.constant.js, urlStates.constant.js, ...). Naming convention: `*.constants.js`.
- ```directives```: Application directives should be stored in this folder (such as: people-picker.directive.js, document-picker.directive.js, ...). Naming convention: `*.js`.
- ```environments```: Store environmetal script file, those classes or variables are different base on the build environment.
- ```models```: Store entities , usually database entities. For example: `account.js`, `category.js`, ...
- ```modules```: Application main modules should be stored in this folder (such as: account-management.module.js, category-management.module, ...). Naming convention: `*.module.js`.
- ```dashboard```: Module folder. Contains :
    - `*.route.js` file (define route)
    - `*.controller.js` file (define module logic)
    - `*.html` template file (define module template) 
    - `*.css` or `*.scss` define styles that are used by components inside this module only.
- `services`: Services that are used throughout the application. Such as: `account.service.js`, `dashboard.service.js`, ...
- ```app.css```: Application global style.
- ```app.js```: Application entry script file.
- ```index.html```: Application entry html file.

### Project build configuration.
- This project:
    - Uses `electron` to make desktop application.
    - Uses `electron-packager` to pack source code to a standalone application.

- Project build configuration is contained in `electron-build.json` that the configuration follows [this reference](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md).

### Project commands.
- `npm run build`: Bundle and publish project files. Files which are generated will be placed inside `packager` folder.
- `npm run start`: Bundle source code and start a development browser. Source code will be built in `dist` folder.

### Bugs report.
- While using this plugin, if you find any errors, please create issues at [project page](https://github.com/redplane/ng-structure)



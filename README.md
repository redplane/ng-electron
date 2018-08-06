## ng-electron

Description:

 * A desktop application structure which uses Javascript.
 * Language supported : 
    * ES2015, ES6 (using `babel-loader`).
    * Sass (using `scss-loader`)
    
* Frameworks & tools:
    * `electron`: **2.0.6**
    * `electron-builder`: **20.26.1**
    * `angularJS`: **1.7.2**
    * `webpack`: **4.16.0**
    * `gulp`: **3.1.0**
    

#### Project structure.
```
.
+-- src
|   +-- assets
|   +-- renderer
|       +-- configs
|       +-- constants
|       +-- directives
|       +-- environments
|       +-- factories
|       +-- models
|       +-- modules
|           +-- <module-name>
|               +-- <module-name>.controller.js
|               +-- <module-name>.html
|               +-- <module-name>.route.js
|               +-- index.js
|           +-- shared
|               +-- <module-name>
|                   +-- <module-name>.controller.js
|                   +-- <module-name>.html
|                   +-- <module-name>.route.js
|                   +-- index.js
|           +-- index.js
|       +-- services
|           +-- <service-name>.service.js
|           +-- index.js
|   +-- styles
|       +-- index.scss
|   +-- app.controller.js
|   +-- app.js
|   +-- app.scss
|-- resources
|-- shared
+-- index.html (Index file)
+-- main.js
```

#### Structure description.
- `src`: Containing application source code, including both: main & renderer processes.
    - ```assets``` : Static files (such as: *.css, *.json, ...) should be stored in this folder.
    - ```renderer``` : Containing application renderer source code, such as: `AngularJS` app.
        - `configs`: Containing renderer configuration, such as: angular route configuration, angular plugin configuration, ...
        - `constants`: Containing constants that are used in renderer angular application.
        - `directives`: Containing directives that are used on renderer pages.
        - `environments`: Containing environmental configuration that are used in renderer process. There are 2 environemental that are currently supported: `development` & `production`.
        - `factories` : Containing angular js factories configuration, such as: `http interceptor`, `cache factory`...
        - `models`: Containing models file, which usually are database entities.
        - `modules`: AngularJS application modules. Can be understood as pages in application.
            -  `<module-name>`: Folder contains logic implementation, html template, route configuration files.
                - `<module-name>.controller.js`: Page controller. (AngularJS controller).
                - `<module-name>.html`: Page html template.
                - `<module-name>.route.js`: Page route configuration.
                - `index.js`: Importing page route & controller.
            - `shared`: Contains modules that are used in whole application. The structure of the module folder must be the same as modules above.
        - `services`: Containing angular services that are used in application. Naming convention of files is : `<service-name>`.service.js.
        - `styles`: Containing styles that are used in whole application. Style can be `*.css`, `*.scss` files.
        - `app.controller.js`: Main application logic..
        - `app.js`: Place to defining libraries that are used in whole application, importing styles that affects the whole application, ...
        - `app.scss`: Importing and defining styles that are used by application.
- `resources`: Application resource files. Files which are placed in this folder will be copied to `resouces` folder in distribution folder. That means, they will not be included in *.asar file. Such as: database file, ...
- `index.html`: Renderer main template. Edit this at your own risk.
- ```models```: Store entities , usually database entities. For example: `account.js`, `category.js`, ...
- ```main.js```: Main process of electron app. : `*.module.js`. To understand electron processes, please refer [this document](https://electronjs.org/docs/tutorial/application-architecture)

### Project commands.
- `npm run start`: Bundle source code and start a development browser. Source code will be built in `build` folder.

### Build application:
- To build the application, please following these steps below:
    - Run `npm run build` to build application source code. The built source code will be placed in `build` folder.
    - Run `electron-builder` to build the application, standalone application will be placed in `dist` folder. For more information, please refer [electron-builder documentation](https://www.electron.build/configuration/configuration)
    
### Bugs report.
- While using this plugin, if you find any errors, please create issues at [project page](https://github.com/redplane/ng-electron)



# Express-Bootstrap
### A ready-to-go Express app template. Just add models, routes, and controllers. Also, comes with integrated Twitter Bootstrap.

----

## Config
Modify your Express app's config in config.js for your different environments.

## Models
Create mongoose models in the "models" folder to have them automatically accessible to your controllers. Just make sure your filenames follow the pattern 'm_modeltype.js'

## Routes & Controllers
Routes and controllers work together to make your app awesome.
* Define routes in the routes folder with filenames following the pattern 'r_routetype.js'. Use routes to control access (you can use Express middleware during route handling), but pass logic to a controller.
* Define controllers in the controllers folder with filenames following the pattern 'c_routetype.js'. Models will be passed in as the second parameter (as a convention, I use 'm' as the variable).
* As long as your routes and controllers are named according to the pattern and share the same name (e.g., r_users.js and c_users.js), the routes and controllers will be automatically coupled.

## Dashboards
To make testing REST endpoints easy, I like to create HTML forms. Following the pattern of the users.html dashboard, create forms to interact with your RESTful endpoints. Any file name will be accessible at http://yourhost/dashboard/NAME based on the name of your dashboard file (e.g., NAME.html).

## Twitter Bootstrap
This template comes with Twitter Bootstrap integrated. You can change the LESS files yourself, namely variables.less, and they will be dynamically re-compiled in the 'development' environment. NOTE: you need to delete 'public/styles/bootstrap.js' for the new file to be generated.

## Run
```JavaScript
node start.js
```
You can set NODE_ENV to 'development' or 'production' (or others if you add them to config)

----

## Requirements
This uses Express, Mongoose as the manipulator of MongoDB, and Redis as a session store. It's built to run on Heroku (which is currently on node 4.7)

* Express	(http://expressjs.com/)
* Mongoose (http://mongoosejs.com/)
* Forever (https://github.com/nodejitsu/forever)
* Async (https://github.com/caolan/async)
* Connect-Compiler (https://github.com/dsc/connect-compiler) - because Connect removed the compiler, and this compiles Twitter Bootstrap LESS files in 'development'

## Architecture

The file structure looks like this:

**start.js** - To run your app, type 'node start.js' which will start your app "forever". You can define your "forever" settings in this file. See: https://github.com/nodejitsu/forever/

**README** - You're looking at it
**package.json** - duh

**private** - Store important app files here. In this template, twitter bootstrap LESS files are here for access by the LESS compiler
**public** - Put files here that need to be accessible by clients (e.g., images, JavaScripts, stylesheets)

**app** - The primary folder for the logic of the app.

> * **app.js** - Creates the express app, executes the config functions, and mounts the models and routes. You shouldn't have to touch this.
> * **config.js** - Sets Express config. You can customize by environment.

> **controllers** - Files that control what the app should do with a web request

>> * **c_xxxx.js** - Create controller files, following the example of the sample "c_default.js". Name file with "c_" at the beginning of the file name. Controllers are dynamically loaded by the routes. I use controllers to handle all app logic.

> **models** - Mongoose model definitions that set the data schema and control how data is manipulated

>> * **m_xxxx.js** - Create model files, following example of "m_users.js". Name file with "m_" at the beginning of the file name. Models are bound to the app when initialized and passed to routes and controllers for access. You should access the models in your controllers via the second parameter: 'm'
>> * **models.js** - Loads all model files in the 'models' directory. Don't touch this.

> **routes** - Define the HTTP entry to the controllers

>> * **r_xxxx.js** - Create route files, following example of "r_default.js". Name file with "r_" at the beginning of the file name. Routes are bound to the app when initialized. If Routes and Controllers have the same name (after _) they will be linked.
>> * **routes.js** - Loads all route files in the 'routes' directory and mounts the controller with the corresponding name. Don't touch this.

> **views** - Views that render the data (I prefer ejs)

>> * **bootstrap.ejs** - Loads twitter bootstrap homepage
>> * **home.ejs** - Simple homepage template using twitter bootstrap

> **dashboards** - HTML forms to test REST endpoints

>> * **users.html** - A sample file. Copy and paste this into a new file and follow the HTML pattern to create new endpoints to take advantage of dynamic features. Note: that files will be accessible at http://host/dashboard/filename

/**********************************************************
*
* EXPRESS APP
* http://expressjs.com/
*
**********************************************************/

/*
* Dependencies.
*/

// Require modules
var url = require('url'),
		express = require('express');


/*
* Create & Configure Express
*/

// Create Express App
var app = express();

// Set up config by environment
(require('./config.js'))(app);


/*
* Mount Models & Routes
*/

// Dynamically mount routes, controllers, and models
// (Note: route filename must match controller filename)
require('./routes/routes.js').mount(app, require('./models/models.js').mount(app));


/*
* Start Webserver
*/

if (module.parent) { throw new Error('Oh crap! No module.parent!'); }
else {
	// Set port if dynamically allocated (e.g., by Heroku)
	var port = parseInt(process.env.PORT) || app.set('port') || 3000;
	
	// Start listening!
	app.listen(port, function(){
	
	  // Show startup messages
		console.log(app.set('name') + " listening on port: " + port);
		console.log('Mongo DB URI: ' + app.set('mongodb-uri'));
		console.log('////////////////////////////////////////////////////////////');
	});
} 

/*
* Module exports
*/
module.exports = app;
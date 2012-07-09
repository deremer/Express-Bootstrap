/*********************************************************
*
* Express Configuration
*
**********************************************************/

module.exports = function(app) {

	// Modules
	var mongoose = require('mongoose'),
			express = require('express'),
			compiler = require('connect-compiler');
	
	/* Set Global Params */
	app.set('name', 'Express-Bootstrap');
	app.set('port', 3000);
	
	
	//////////////////////////////////////////////////////////
	// Set config for Development
	//////////////////////////////////////////////////////////
	
	app.configure('development', function() {
		
		/* Set Params */
		app.set('host', 'http://localhost');
		app.set('sessionSecret', 'somerandomsession4dev');
		app.set('cookieSecret', 'somerandomcookie4dev');
		
		// Logger
		app.use(express.logger('dev'));
		
		// MongoDB
  	app.set('mongodb-uri', 'mongodb://localhost/temp');
  	
  	// No need to touch these
  	app.set('env', 'development');
		app.set('name', app.set('name') + ' (' + app.set('env') + ')'); 
		
		// Enable LESS compiler
		app.use(compiler({
        enabled : [ 'less' ],
        src     : 'private',
        dest     : 'public'
    }));
	});
	
	
	//////////////////////////////////////////////////////////
	// Set config for Production
	//////////////////////////////////////////////////////////
	
	app.configure('production', function() {
		/* Set Params */
		app.set('host', 'http://localhost');
		app.set('sessionSecret', 'somerandomsession4prod');
		app.set('cookieSecret', 'somerandomcookie4prod');
		
		// Logger
		app.use(express.logger());
		
		// MongoDB
  	app.set('mongodb-uri', 'mongodb://localhost/temp');
  	
  	// No need to touch these
  	app.set('env', 'production');
		app.set('name', app.set('name') + ' (' + app.set('env') + ')'); 
	});
	
	
	//////////////////////////////////////////////////////////
	// Set config for All
	//////////////////////////////////////////////////////////
	
	app.configure(function() {
	
		// Connect to Mongoose
		this.set('mongoose', mongoose.connect(this.set('mongodb-uri')));
	
		// Connect middleware
	  app.use(express.bodyParser());
	  app.use(express.cookieParser(app.set('cookieSecret')));
	  app.use(express.methodOverride());
	  
	  // Session support, ideally with mongo or redis
		app.use(express.session({ secret: app.set('sessionSecret') }));
	
		// Enable JSONP
		app.enable('jsonp callback');	
		
		// Paths
	  app.set('publicPath', __dirname + '/../public');
	  app.set('views', __dirname + '/views');
	  app.use(express.static(app.set('publicPath')));
	  app.use(express.staticCache());
	  app.use(express.favicon(app.set('publicPath') + '/ico/favicon.ico'));
	  
	  // View/Template engine
		app.set('view engine', 'ejs');		
		
		// Router
		app.use(app.router);
		
		// Error Handling
		if (app.set('env') == 'Production') {
			app.use(function(err, req, res, next) {
				res.set('X-INTERNAL-ERROR', err.toString());
				res.send(err.status || 404, err);
			});	
		} else {
			app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
		}
	});

	

};
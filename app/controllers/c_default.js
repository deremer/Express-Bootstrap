/**********************************************************
*
* Controller For App
* (Default)
*
**********************************************************/


var mount = function (app, m) {


	this.index = function(req, res, next) {
		if (req.param('data')) { res.locals.data = req.param('data'); }
		else { res.locals.data = 'Add something to the querystring (e.g., ?data=tacos)'; }
		res.render('home.ejs');
	}	
	
	this.bootstrap = function(req, res, next) {
		res.render('bootstrap.ejs');
	}
	
	this.dosomething = function(req, res, callback) {
		callback(null, 'did it!');
	}
	
	this.error = function(req, res, next) {
		throw new Error('You can throw errors');
	}
	
	this.nextError = function(req, res, next) {
		next('You can return errors by calling next');
	}
};



/*
* Module exports
*/
exports.mount = mount;
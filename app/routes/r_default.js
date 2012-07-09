/**********************************************************
*
* Routes For App
* (Default)
*
**********************************************************/

var mount = function (app, controller) {


	// Default route, render HTML
	app.get('/', controller.index);

	
	// Call a controller, render Twitter Bootstrap
	app.get('/bootstrap', controller.bootstrap);

	
	// Call a controller and handle the response in the route
	app.get('/dosomething', function(req, res, next) { 
		controller.dosomething(req, res, function(err, result) {
			if (err) { throw new Error(err); }
			else {
				res.json({'result': result});
			}
		});	
	});

	
	// Return error by throwing an error
	app.get('/error', controller.error);

	
	// Return error by calling next with an error
	app.get('/nexterror', controller.nextError);
	
};

/*
* Module exports
*/
exports.mount = mount;
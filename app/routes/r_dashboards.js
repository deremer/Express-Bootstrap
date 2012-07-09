/**********************************************************
*
* Routes For App
* (Dashboards)
* For creating HTML forms to access API-style endpoints
*
**********************************************************/

var mount = function (app, controller) {


	app.get('/dashboard/:dashname', function(req, res, next) {
		controller.show(req, res, next);
	});
	
};

/*
* Module exports
*/
exports.mount = mount;
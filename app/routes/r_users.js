/**********************************************************
*
* Routes For App
* (Users)
*
**********************************************************/


var mount = function (app, controller) {


	// Get users
	app.get('/users', controller.get);

	// Create user
	app.post('/users', controller.create);
	
	// Call a controller, render Twitter Bootstrap
	app.get('/users/:id', controller.getOne);
	
};

/*
* Module exports
*/
exports.mount = mount;
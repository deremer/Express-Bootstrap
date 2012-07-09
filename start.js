/**********************************************************
*
* Run App Forever
* https://github.com/nodejitsu/forever
*
**********************************************************/

// Require modules
var forever = require('forever');

// Start appserver
var appserver = new (forever.Monitor)('./app/app.js');
appserver.start();


// Report messages to console
appserver.on('start', function(err) {
	console.log('////////////////////////////////////////////////////////////');
	console.log('Spinning up...');
});

appserver.on('error', function(err) {
	throw new Error(err);
})
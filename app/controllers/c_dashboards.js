/**********************************************************
*
* Controller For App
* (Dashboards)
*
**********************************************************/

var fs = require('fs');

var mount = function (app, m) {

	// Look for the requested dashboard and send HTML if it's present
	this.show = function(req, res, next) {
		fs.readFile(__dirname + '/../dashboards/' + req.params.dashname + '.html', 'utf8', function(err, text){
			if (err) { next('The dashboard "' + req.params.dashname + '.html" does not exist'); }
			else { 
				text = text.replace(/#name#/gi, req.params.dashname.toUpperCase());
				text = text.replace(/#domain#/gi, req.headers.host);
				text = text.replace(/#environment#/gi, app.set('env'));
				res.send(text);		
			}
    });
	}
		
};


/*
* Module exports
*/
exports.mount = mount;
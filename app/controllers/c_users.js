/**********************************************************
*
* Controller For App
* (Users)
*
**********************************************************/


var mount = function (app, m) {

	this.get = function(req, res, next) {
		m.USERS.find({}, function(err, results) {
			if (err) { next(err); }
			else { res.json({'result': results}); }
		});
	}	
	
	this.create = function(req, res, next) {
		if (req.param('username') && req.param('password')) {
			var uObj = {};
			uObj.username = req.param('username');
			uObj.password = req.param('password');
			if (req.param('name')) { 
				uObj.data = {};
				uObj.data.name = req.param('name');	
			}
			
			m.USERS.create(uObj, function(err, user) {
				if (err) { next(err); }
				else { res.json({'result': user}); }
			});
			
		} else { next('Missing required params'); }
	}
	
	this.getOne = function(req, res, next) {
		if (req.params.id) {
			m.USERS.findById(req.params.id, function(err, user) {
				if (err) { next(err); }
				else { res.json({'result': user}); }
			});
		} else { next('Missing user ID'); }
	}
	
};



/*
* Module exports
*/
exports.mount = mount;
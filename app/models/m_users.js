/**********************************************************
*	
* MODEL
* User Definition
*
**********************************************************/


/*
* Model Definition Function
*/
exports.define = function (app) {

	// Set module imports
	var mongoose = require('mongoose'),
			crypto = require('crypto');
	
	// Set schema variables
	var Schema = mongoose.Schema,
	  	Mixed = Schema.Types.Mixed,
	    ObjectId = Schema.ObjectId;


	/*
	* Embedded document schemas
	*/

	// Define schemas to embed here
	// before using them in main model
		
		
	/*
	* Schema definition 
	*/

	var User = new Schema ({
	  								
	  modOn    		: { 	type : Date
	  								, required: true
	  							},			

	  un    			: { 	type : String
	  								, required : true
	  								, lowercase: true
	  							},
	  							
	  hash_pw    	: { 	type : String
	  								, required: true 
	  							},
	  							
	  							
	  salt				: { 	type : String
	  								, required: true 
	  							},
	  							
	  active	    : { 	type : Boolean
	  								, required: true
	  								, 'default': true
	  							},
	  
	  token				: {
	  									type : String
	  								, required: true 
	  							},
	  
	  data 				: {
	  									type : {}
	  							},
	  							
	  services		: {
	  									type : []
	  							}							
	  
	});
	
	
	/*
	* Indexes
	*/

	User.index({ 'un': 1 }, {unique: true, safe: true}); 
	User.index({ 'token': 1 }, {unique: true, safe: true}); 
	
	
	/*
	* Virtuals and middleware
	*/

	User.virtual('id')
	    .get(function() { return this._id.toHexString(); });
	
	User.virtual('password')
	  	.set(function(password) {
	    	this._password = password;
		    this.salt = this.makeSalt(this.user);
		    this.hash_pw = this.encryptPassword(password);
	  	})
	  	.get(function() { return this._password; });
	
	User.pre('save', function(next) {
	  this.modOn = Date.now()
	  next();
	});
	
	
	/*
	* Methods: manipulate a record
	*/
	
	User.method('makeSalt', function(seed) {
	  return Math.round((Date.now() * Math.random())) + seed;
	});
	
	User.method('encryptPassword', function(password) {
	  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	});
	
	User.method('authenticate', function(plainText) {	
	  return this.encryptPassword(plainText) === this.hash_pw;
	});
	
	User.method('makeToken', function(seed) {	
		var tokenSalt = this.makeSalt(seed);
	 	return crypto.createHmac('md5', tokenSalt).digest('hex');
	});
	
	User.method('setup', function(uObj, callback) {
		if (_u.isObject(uObj)) {
			this.modOn = Date.Now();
			this.un = uObj.username;
			this.password = uObj.password;
			this.token = this.makeToken(uObj.username);
			if (uObj.data) { this.data = uObj.data } else { this.data = {}; }
			if (uObj.services) { this.services = uObj.services } else { this.services = []; }
			this.markModified('data');
			this.markModified('services');
			this.save(function(err) {
				if (err) { callback(err); }
				else { callback(); }
			});
		} else { callback('Missing required field to create user'); }
	});
			
	/**********************************************************
	* Statics: manipulate a model
	**********************************************************/
	User.statics.create = function(uObj, callback) {
		var user = new this();
		user.setup(uObj, function(err) {
			if (err) { callback(err); }
			else { callback(null, user); }
		});
	}

	/**********************************************************
	* Statics: return model
	**********************************************************/
	
	return mongoose.model('User', User);
}

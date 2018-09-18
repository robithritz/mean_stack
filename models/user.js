var bcryptjs = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username:  {type: String, required: true},
	password: String,
	name:   String,
	email: {type: String, required: true}
}, {collection: 'users'});


var User = module.exports = mongoose.model('Users', userSchema);

module.exports.addUser = function(newUser, callback){
	bcryptjs.genSalt(10, function(err, salt){
		bcryptjs.hash(newUser.password, salt, function(err, hash){
			newUser.password = hash;
			User.create(newUser, function(err, res){
				callback(err, res);
			});
		});
	});
}
module.exports.validateUser = function(data, callback){
	User.findOne({username: data.username}).exec((err, result) => {
		if(err) {
			callback(1, err);
			return;
		}
		if(result){
			bcryptjs.compare(data.password, result.password, (err, valid) =>{
				if(valid){
					// user valid
					callback(0, "Correct", {_id: result._id, username: result.username, name: result.name, email: result.email });
				}else{
					//user invalid
					callback(1, "Incorrect Username or Password");
				}
			})
		}else{
			callback(1, "Incorrect Username or Password");
		}
	});
}
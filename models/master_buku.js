var bcryptjs = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var master_bukuSchema = new Schema({
	judul:  {type: String, required: true},
	tahun_terbit: String,
	jml_hal:   Number,
	pengarang: Array,
	category:   String,
}, {collection: 'master_buku'});


var master_buku = module.exports = mongoose.model('master_buku', master_bukuSchema);

module.exports.addUser = function(newBuku, callback){
	/*bcryptjs.genSalt(10, function(err, salt){
		bcryptjs.hash(newUser.password, salt, function(err, hash){
			newUser.password = hash;
			User.create(newUser, function(err, res){
				callback(err, res);
			});
		});
	});*/
}
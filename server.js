const express 	= require('express'),
	path		= require('path'),
	bodyParser 	= require('body-parser'),
	cors		= require('cors'),
	mongoose	= require('mongoose'),
	passport	= require('passport');

// const FacebookStrategy = require('passport-facebook');

const app 		= express();
const users 	= require('./router/users');
const dbconf 	= require('./config/database');
const User 		= require('./models/user');
const master_buku 		= require('./models/master_buku');

function reconnect_login(){
	mongoose.connect(dbconf.dburl).then(
	  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
	  err => { 
	  		console.log("cannot connect! reconnecting..");
	  		setTimeout(reconnect_login,5000);
		}
	);
}
reconnect_login();


mongoose.connection.on('connected', function(){
	console.log("Connected!");
	/*master_buku.find({judul: /Harry/, tahun_terbit: {$gte: 2001} }).exec((err, res) => {
		console.log(err);
		console.log(res);
	});*/
});

mongoose.connection.on('disconnected', function(){
	console.log("Disconnected!");
});



/*dbconf.connect(dbconf.dburl, (err, res) => {
	if(err){
		console.log("Error : %s", err);
	}else{
		console.log("Database Connected");
	}
});
*/

// function connectToDB(){
	/*MongoClient.connect(dbconf.dburl,{useNewUrlParser: true}, (err, db) => {
		if(err){
			setTimeout(connectToDB, 5000);
		}else{
			dbclient = db;
			dbo = db.db();
		}
	});*/
// }


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

/*passport.use(new FacebookStrategy({
    clientID: '477057009443853',
    clientSecret: 'd26354435b698e5125b9598bdffca2e8',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
  	console.log(accessToken);
  	console.log(refreshToken);
  	console.log(profile.id);
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
*/
app.use('/static', express.static(path.join(__dirname ,'public')));
app.use('/users', users);
app.get('/', (req, res) => {
	res.send('Welcome to Mean STACK ');
});

app.listen(3000, () => {
	console.log('started 3000');
});
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const dbconf    = require('./database');
const User      = require('../models/user');
// opts.issuer = 'robithritz';
// opts.audience = 'yoursite.net';

module.exports = function(passport) {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JAuth');
    opts.secretOrKey = dbconf.secretKey;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload._id}, {password: 0, __v: 0}, function(err, user) {
            console.log(err);
            console.log(user);
            if (err) {
                return done({status: false, message: err}, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })); 
}
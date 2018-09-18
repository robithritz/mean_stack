const express 	= require('express'),
	router 		= express.Router(),
	passport	= require('passport'),
	jwt 		= require('jsonwebtoken'),
	dbconf		= require('../config/database'),
	User 		= require('../models/user');


router.post('/register', (req, res, next) => {
	User.addUser({username: req.body.username, password: req.body.password, name: req.body.name, email: req.body.email}, (err, result) => {
		if(err){
			if(err == 2){
				res.json({status: false, message: "Username already exist"});
			}else{
				res.json({status: false, message: "Error : "+ err.message});	
			}
			
		}else{
			res.json({status: true, message: "Successful"});
		}
	});
});
router.post('/login', (req, res) => {
	username = req.body.username;
	password = req.body.password;

	User.validateUser({username: username, password: password}, (err, msg, data) => {
		if(err){
			res.json({status: false, message: msg});
			return;
		}
		jwt.sign(data, dbconf.secretKey, (err, token) => {
			if(err){
				res.json({status: false, message: "Something went wrong"});
				return;		
			}
			res.json({status: true, message: "Successful", auth_token: "JAuth "+token, data: data});
			return;
		})
	});
});
router.get('/profile', passport.authenticate('jwt', { session: false }),  (req, res, next) => {
	if(req.user){
		res.json({status: true, data: req.user});
		return;	
	}
	res.json({status: false, message: "User Not Found"});
});
router.post('/auth/facebook', (req, res, next) => {
	res.send('authenticate');
});
router.get('/auth/facebook/callback', (req, res, next) => {
	console.log(req);
});
router.get('/authenticate', (req, res, next) => {
	res.send('authenticate');
});
router.get('/profile', (req, res, next) => {
	res.send('profile');
});
router.get('/validate', (req, res, next) => {
	res.send('validate');
});


module.exports = router;
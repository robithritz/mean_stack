const express 	= require('express'),
	router 		= express.Router();


router.get('/register', (req, res, next) => {
	res.send('Register Form');
});

module.exports = router;
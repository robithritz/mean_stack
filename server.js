const express 	= require('express'),
	path		= require('path'),
	bodyParser 	= require('body-parser'),
	cors		= require('cors'),
	passport	= require('passport');

const app = express();
const users = require('./router/users');

app.use('/users', users);
app.get('/', (req, res) => {
	res.send('Welcome to Mean STACK ');
});

app.listen(3000, () => {
	console.log('started 3000');
});
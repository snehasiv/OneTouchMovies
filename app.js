var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();


app.use(express.static( path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use('/',require('./routes/query'));

app.get('/', (req, res) => {
   res.sendFile('index.html', {
     root: path.join(__dirname,'public')
   });
});

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
});

module.exports = app;
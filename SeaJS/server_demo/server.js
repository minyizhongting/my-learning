var express = require('express');

var app = express();

app.get('/', function(req,res) {
	res.sendFile(__dirname + '/html/index.html');
});

app.get('*.js', function(req,res) {
	res.sendFile(__dirname + req.path);
});

app.listen(3000, function() {
	console.log('Server listening on port 3000!\n');
})
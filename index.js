var express = require('express');
var apiRouter = require('./routes/api/scrape.js');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use('/api/scrape', apiRouter);

app.get('/', function (req, res) {
	res.send({message: 'Welcome to the BBC Food Recipe Scraper'});
});

app.listen(3000, function () {
	console.log('Listening on Port 3000');
});
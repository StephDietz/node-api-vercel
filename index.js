const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/' + 'home.htm');
});

app.get('/get_form', function (req, res) {
	res.sendFile(__dirname + '/' + 'get_form.htm');
});

app.get('/post_form', function (req, res) {
	res.sendFile(__dirname + '/' + 'post_form.htm');
});

app.post('/process_post', urlencodedParser, function (req, res) {
	// Prepare output in JSON format
	response = {
		first_name: req.body.first_name,
		last_name: req.body.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

app.get('/process_get', function (req, res) {
	// Prepare output in JSON format
	response = {
		first_name: req.query.first_name,
		last_name: req.query.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

const server = app.listen(8081, function () {
	const host = server.address().address;
	const port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

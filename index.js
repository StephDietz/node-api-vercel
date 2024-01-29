require('dotenv').config();

const express = require('express');
const app = express();
const { sql } = require('@vercel/postgres');

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

app.get('/user_upload_form', function (req, res) {
	res.sendFile(__dirname + '/' + 'user_upload_form.htm');
});

app.post('/addUser', urlencodedParser, async (req, res) => {
	try {
		await sql`INSERT INTO Users (Id, Name, Email) VALUES (${req.body.user_id}, ${req.body.name}, ${req.body.email});`;
		res.status(200).send('<h1>User added successfully</h1>');
	} catch (error) {
		console.error(error);
		res.status(500).send('Error adding user');
	}
});

app.get('/getUsers', async (req, res) => {
	try {
		const users = await sql`SELECT * FROM Users;`;
		console.log(users.rows);
		if (users) {
			res.status(200).send(`<h1>Users</h1><pre>${JSON.stringify(users.rows, null, 2)}</pre>`);
		} else {
			res.status(404).send('Users not found');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Error retrieving user');
	}
});

const server = app.listen(8081, function () {
	const host = server.address().address;
	const port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

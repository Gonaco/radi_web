import express from 'express';
import path from 'path';
var app = express();

var port = 3001;

app.use(express.static('INICI/HEADER'));
var __dirname = path.resolve();
// viewed at http://localhost:3001
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/INICI/HEADER/header.html'));
});

app.listen(port, function () {
	console.log(`Three.js app listening on port ${port}`);
});

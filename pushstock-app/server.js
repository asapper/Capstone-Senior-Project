// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Bear = require('./app/models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


// CONNECT TO DB
mongoose.connect('mongodb://127.0.0.1/testdb');


// ROUTES FOR API
var router = express.Router();

router.use(function(req, res, next) {
	// logging
	console.log('Some validation (should be) happening here!');
	next(); // next route
});

// routes here
router.get('/', function(req, res) {
    console.log("GET: /api/ being accessed")
	res.json({ message: 'Hooray! Welcome to our API!' });
});

router.post('/singleClick', function(req, res) {
    button_id = req.body.buttonid
    click_timestamp = req.body.click_timestamp
    console.log("POST: Single Click by button " +
        button_id + " at " + click_timestamp);
    res.json({ message: 'Single click acknowledged' });
});


// REGISTER ROUTES
// all routes here will be prefixed with /api
app.use('/api', router);


// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);

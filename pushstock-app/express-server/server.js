// Get dependencies
const express = require('express');
const app = express();
//const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Get our API routes
const api_routes = require('./routes/api');

// Parsers for POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross Origin middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Connect to DB (mongodb = name of mongo container)
// (database is name of link in docker-compose to database service)
// (docker-files is root directory of project)
const dbHost = 'mongodb://database/pushstock-app'
mongoose.connect(dbHost);

// Set our api routes
app.use('/api', api_routes);

// Create HTTP Server
const server = http.createServer(app);

// Listen on provied port, on all network interfaces
server.listen(port, () => console.log('API running on localhost:' + port));

// Get dependencies
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const brcypt = require('bcrypt-nodejs');

// Get our API routes
const main_router = require('./config/urls');

// Parsers for POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Point static path to dist
app.use(express.static('../public/dist'));

// URLs
app.use('/', main_router);

// Catch all routes and return index file
app.get('*', (req, res) => {
    res.sendFile('../public/dist/index.html');
});

// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Get port from environment and store in Express
//const port = process.env.PORT || '3000';
//app.set('port', port);

// Get port from environment and store in Express
const port = process.env.PORT || '4200';
app.set('port', port);

const secret = '201701-PVS02';
app.set('secret', secret);

// Connect to DB (mongodb = name of mongo container)
// (database is name of link in docker-compose to database service)
// (docker-files is root directory of project)
const dbHost = 'mongodb://database/pushstock-app';

/*
const options = {
    user: process.env.PUSHSTOCK_API_USERNAME,
    pass: process.env.PUSHSTOCK_API_PASSWORD
};
*/
mongoose.connect(dbHost);


// Create HTTP Server
const server = http.createServer(app);

// Listen on provied port, on all network interfaces
server.listen(port, () => console.log('API running on localhost:' + port));

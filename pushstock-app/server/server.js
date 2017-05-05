const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const brcypt = require('bcrypt-nodejs');
const morgan = require('morgan');


// Ports
const HTTP_PORT = '80';
const HTTPS_PORT = '4200';

// Certificates
const serverOptions = {
	key: fs.readFileSync('./config/key.pem'),
	cert: fs.readFileSync('./config/cert.pem')
};

// API routes
const main_router = require('./config/urls');

const app = express();
const redirectApp = express();

// Parsers for POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross Origin middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// check if only testing server
if (process.env.NODE_ENV === 'test') {
    // URLs
    app.use('/', main_router);
    // For testing purposes
    const dbHost = 'mongodb://localhost:27017/pushstock-app';
    mongoose.Promise = require('bluebird');
    mongoose.connect(dbHost);

    const server = http.createServer(app).listen("4200", () => console.log('Test server working!'));
    module.exports = server;
} else {
    // Point static path to dist
    app.use(express.static('../public/dist'));
    // Set logger
    app.use(morgan('dev'));

    // Catch all routes and secure
    app.all('**', function(req, res, next){
    	if(req.secure){
    		return next();
    	};
    	res.sendFile('../public/dist/index.html');
    });

    // URLs
    app.use('/', main_router);

    const secret = '201701-PVS02';
    app.set('secret', secret);

    // Connect to DB (mongodb = name of mongo container)
    // database is name of link in docker-compose to database service
    // pushstock-app is root directory of project
    const dbHost = 'mongodb://database/pushstock-app';
    const dbOptions = {
        user: process.env.PUSHSTOCK_API_USERNAME,
        pass: process.env.PUSHSTOCK_API_PASSWORD
    };
    
    mongoose.Promise = require('bluebird');
    mongoose.connect(dbHost, dbOptions);

    // Create HTTP Server to redirect
    const insecureServer = http.createServer(redirectApp, function(req, res){
    	res.redirect('https://192.168.3.108:4200');
    }).listen(HTTP_PORT);

    // Create HTTPS Server
    const secureServer = https.createServer(serverOptions, app);
    // Listen on provied port, on all network interfaces
    secureServer.listen(HTTPS_PORT, () => console.log('Secure API running on localhost:' + HTTPS_PORT));
}

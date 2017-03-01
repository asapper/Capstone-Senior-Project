// Get dependencies
const express = require('express');
const main_router = express.Router();

// Get our API routes
const api_routes = require('../api/urls');


// Set our api routes
main_router.use('/api', api_routes);


// export routes
module.exports = main_router;

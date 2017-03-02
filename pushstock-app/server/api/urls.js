const express = require('express');
const api_router = express.Router();

const views = require('./views');


// Route always called (verifications done here)
api_router.use(views.apiAuthProcedure);
// Main route (ex: /api/)
api_router.get('/', views.indexView);
// Single click POST route (ex: /api/singleClick)
api_router.post('/singleClick', views.singleClickView);
// Retrieve all Buttons in database (ex: /api/buttons)
api_router.get('/buttons', views.getAllButtonsView);

module.exports = api_router;

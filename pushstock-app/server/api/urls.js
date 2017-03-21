const express = require('express');
const api_router = express.Router();

const Button = require('../app/models/button');
const views = require('./views');


// Route always called (verifications done here)
api_router.use(views.apiAuthProcedure);
// Main route (ex: /api/)
api_router.get('/', views.indexView);
// Single click POST route (ex: /api/singleClick)
api_router.post('/singleClick', views.singleClickView);
// Retrieve all Buttons in database (ex: /api/buttons)
api_router.get('/buttons', views.getAllButtonsView);
// Retrieve all open Tasks in database (ex: /api/tasks)
api_router.get('/tasks', views.getAllTasksView);
// Delete all open Tasks (for testing)
api_router.delete('/tasks', views.deleteAllTasksView);
// Add a button to the database
api_router.post('/addButton', views.addButtonView);

module.exports = api_router;

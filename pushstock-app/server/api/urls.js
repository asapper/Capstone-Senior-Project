/*
* File:         urls.js
* Author:       Brennan, Andy, Ryan, Collin
* Description:  urls for the express api
*
* Edit history:
*
* Editor			Date				Description
* ------			--------		-----------
* sapper			03/01/17		File created
* Saul        03/16/17    get employeeList
* Saul        03/16/17    Add employee
* Saul        03/20/17    Deleted all employees
*/

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
// Retrieve all Employees in database (ex: /api/employees)
api_router.get('/employees', views.getAllEmployeesView);
// Add an emplyee to the database
api_router.post('/addEmployee', views.addEmployeeView);
// Delete all open employees (for testing)
api_router.delete('/employees', views.deleteAllEmployeesView);
// Delete a specified button
api_router.delete('/buttons/:macAddr', views.deleteButtonView);




module.exports = api_router;

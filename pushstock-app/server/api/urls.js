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
* Saul        03/16/17    Get employeeList
* Saul        03/16/17    Add employee
* Saul        03/20/17    Deleted all employees
* Saul        03/27/17    Path for delete button added
* Saul        03/27/17    Path for delete employee added
* Saul        04/20/17    Path for markTaskCompleteView
* Saul        04/20/17    Path for getOpenTasks & getCompletedTasks
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
// Retrieve all active Buttons in database (ex: /api/activebuttons)
api_router.get('/activebuttons', views.getAllActiveButtonsView);
// Retrieve a specific Button (ex: /api/buttons/1)
api_router.get('/buttons/:macAddr', views.getSingleButtonView);
// Update a specific Button (ex: /api/buttons/1)
api_router.put('/buttons/:macAddr', views.updateSingleButtonView);
// Delete a specified button
api_router.delete('/buttons/:macAddr', views.deleteButtonView);
// Add a button to the database
api_router.post('/addButton', views.addButtonView);
// Retrieve all assigned buttons
api_router.get('/assignedbuttons', views.getAssignedButtonsView);
// Retrieve all unassigned buttons
api_router.get('/unassignedbuttons', views.getUnassignedButtonsView);
// Update an unassigned button
api_router.put('/assignbutton', views.assignButtonView);
// Update an assigned button
api_router.put('/unassignbutton', views.unassignButtonView);

// Retrieve all Tasks in database (ex: /api/tasks)
api_router.get('/tasks', views.getAllTasksView);
// Retrieve a specific task (ex: /tasks/1)
api_router.get('/tasks/:taskId', views.getSingleTaskView);
// Mark task as complete
api_router.put('/tasks/:_id', views.markTaskCompleteView);
// Retrieve all open Tasks in the database
api_router.get('/openTasks', views.getOpenTasksView);
// Retrieve all completed Tasks in the database
api_router.get('/completedTasks', views.getCompletedTasksView);
// Add a task to the database
api_router.post('/addTask', views.addTaskView);
// Delete all open Tasks (for testing)
api_router.delete('/tasks', views.deleteAllTasksView);
// Update a task
api_router.put('/reassigntask', views.reassignTaskView);

// Retrieve all Employees in database (ex: /api/employees)
api_router.get('/employees', views.getAllEmployeesView);
// Delete all open employees (for testing)
api_router.delete('/employees', views.deleteAllEmployeesView);
// Add an emplyee to the database
api_router.post('/addEmployee', views.addEmployeeView);
// Delete a specified employee
api_router.delete('/employees/:_id', views.deleteEmployeeView);
// Update a specific employee
api_router.put('/employees/:email', views.updateSingleEmployeeView);
// Retrieve a specific Button (ex: /api/buttons/1)
api_router.get('/employees/:email', views.getSingleEmployeeView);
// Returns true if the employee has an open task
api_router.get('/hasTask/:_id', views.hasTaskView);
// Delete the completed tasks Associated with an employee
api_router.delete('/deleteCompletedTasks/:_id', views.deleteCompletedTasksView);

module.exports = api_router;

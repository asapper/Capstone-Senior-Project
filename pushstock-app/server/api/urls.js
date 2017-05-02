/*
* File:         urls.js
* Author:       Brennan, Andy, Ryan, Collin
* Description:  urls for the express api
*
* Edit history:
*
* Editor		Date			Description
* ------		--------		-----------
* sapper		03/01/17		File created
* Saul          03/16/17        Get employeeList
* Saul          03/16/17        Add employee
* Saul          03/20/17        Deleted all employees
* Saul          03/27/17        Path for delete button added
* Saul          03/27/17        Path for delete employee added
* Saul          04/20/17        Path for markTaskCompleteView
* Saul          04/20/17        Path for getOpenTasks & getCompletedTasks
* Sapper        05/01/17        Include files for separate view implementations
*/

const express = require('express');
const api_router = express.Router();

const Button = require('../app/models/button');
const views = require('./views');

const AuthenticationController = require('../controllers/authentication');
const passportService = require('../config/passport');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const rpiViews = require('./rpi.views');
const buttonViews = require('./button.views');
const taskViews = require('./task.views');
const employeeViews = require('./employee.views');


// Route always called (verifications done here)
api_router.use(views.apiAuthProcedure);

// Main route (ex: /api/)
api_router.get('/', views.indexView);

// Single click POST route (ex: /api/singleClick)

api_router.post('/singleClick', views.singleClickView);

// Retrieve all Buttons in database (ex: /api/buttons)
api_router.get('/buttons', requireAuth, views.getAllButtonsView);
// Retrieve a specific Button (ex: /api/buttons/1)
api_router.get('/buttons/:macAddr', requireAuth, views.getSingleButtonView);
// Update a specific Button (ex: /api/buttons/1)
api_router.put('/buttons/:macAddr', requireAuth, views.updateSingleButtonView);
// Delete a specified button
api_router.delete('/buttons/:macAddr', requireAuth, views.deleteButtonView);
// Add a button to the database
api_router.post('/addButton', requireAuth, views.addButtonView);
// Retrieve all assigned buttons
api_router.get('/assignedbuttons', requireAuth, views.getAssignedButtonsView);
// Retrieve all unassigned buttons
api_router.get('/unassignedbuttons', requireAuth, views.getUnassignedButtonsView);
// Update an unassigned button
api_router.put('/assignbutton', requireAuth, views.assignButtonView);
// Update an assigned button
api_router.put('/unassignbutton', requireAuth, views.unassignButtonView);

// Retrieve all open Tasks in database (ex: /api/tasks)
api_router.get('/tasks', requireAuth, views.getAllTasksView);
// Retrieve a specific task (ex: /tasks/1)
api_router.get('/tasks/:taskId', taskViews.getSingleTaskView);
// Mark task as complete
api_router.put('/tasks/:_id', taskViews.markTaskCompleteView);
// Retrieve all open Tasks in the database
api_router.get('/openTasks', taskViews.getOpenTasksView);
// Retrieve all completed Tasks in the database
api_router.get('/completedTasks', taskViews.getCompletedTasksView);
// Add a task to the database
api_router.post('/addTask', taskViews.addTaskView);
// Delete all open Tasks (for testing)
api_router.delete('/tasks', taskViews.deleteAllTasksView);
// Delete a specified task
api_router.delete('/tasks/:taskId', taskViews.deleteTaskView);
// Update a task
api_router.put('/reassigntask', taskViews.reassignTaskView);

// Retrieve all Employees in database (ex: /api/employees)
api_router.get('/employees', requireAuth, views.getAllEmployeesView);
// Delete all open employees (for testing)
api_router.delete('/employees', requireAuth, views.deleteAllEmployeesView);
// Add an emplyee to the database
api_router.post('/addEmployee', requireAuth, views.addEmployeeView);
// Delete a specified employee
api_router.delete('/employees/:email', requireAuth, views.deleteEmployeeView);
// Update a specific employee
api_router.put('/employees/:email', requireAuth, views.updateSingleEmployeeView);
// Retrieve a specific Button (ex: /api/buttons/1)
api_router.get('/employees/:email', requireAuth, views.getSingleEmployeeView);

// Returns true if the employee has an open task
api_router.get('/hasTask/:_id', employeeViews.hasTaskView);
// Delete the completed tasks Associated with an employee
api_router.delete('/deleteCompletedTasks/:_id', employeeViews.deleteCompletedTasksView);


module.exports = api_router;

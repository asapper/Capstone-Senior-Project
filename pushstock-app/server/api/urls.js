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

// Constants for role types
const REQUIRE_ADMIN = "Admin",
      REQUIRE_WORKER = "Worker",
      REQUIRE_PI = "Pi";


// Route always called (verifications done here)
api_router.use(views.apiAuthProcedure);

// Main route (ex: /api/)
api_router.get('/', views.indexView);

// Single click POST route (ex: /api/singleClick)

api_router.post('/singleClick', rpiViews.singleClickView);

// Retrieve all Buttons in database (ex: /api/buttons)
api_router.get('/buttons', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), buttonViews.getAllButtonsView);
// Retrieve all active Buttons in database (ex: /api/activebuttons)
api_router.get('/activebuttons', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), buttonViews.getAllActiveButtonsView);
// Retrieve a specific Button (ex: /api/buttons/1)
api_router.get('/buttons/:macAddr', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), buttonViews.getSingleButtonView);
// Update a specific Button (ex: /api/buttons/1)
api_router.put('/buttons/:macAddr', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), buttonViews.updateSingleButtonView);
// Delete a specified button
api_router.delete('/buttons/:macAddr', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), buttonViews.deleteButtonView);
// Add a button to the database
api_router.post('/addButton', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), buttonViews.addButtonView);
// Retrieve all assigned buttons
api_router.get('/assignedbuttons', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), buttonViews.getAssignedButtonsView);
// Retrieve all unassigned buttons
api_router.get('/unassignedbuttons', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), buttonViews.getUnassignedButtonsView);
// Update an unassigned button
api_router.put('/assignbutton', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), buttonViews.assignButtonView);
// Update an assigned button
api_router.put('/unassignbutton', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), buttonViews.unassignButtonView);

// Retrieve all open Tasks in database (ex: /api/tasks)
api_router.get('/tasks', requireAuth, AuthenticationController.roleAuthorization([REQUIRE_ADMIN, REQUIRE_WORKER]), taskViews.getAllTasksView);
// Retrieve a specific task (ex: /tasks/1)
api_router.get('/tasks/:taskId', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), taskViews.getSingleTaskView);
// Mark task as complete
api_router.put('/tasks/:_id', requireAuth, AuthenticationController.roleAuthorization([REQUIRE_ADMIN, REQUIRE_WORKER]), taskViews.markTaskCompleteView);
// Retrieve all open Tasks in the database
api_router.get('/openTasks', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), taskViews.getOpenTasksView);
// Retrieve all completed Tasks in the database
api_router.get('/completedTasks', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), taskViews.getCompletedTasksView);
// Add a task to the database
api_router.post('/addTask', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), taskViews.addTaskView);
// Delete all open Tasks (for testing)
api_router.delete('/tasks', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), taskViews.deleteAllTasksView);
// Delete a specified task
api_router.delete('/tasks/:taskId', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), taskViews.deleteTaskView);
// Update a task
api_router.put('/reassigntask', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), taskViews.reassignTaskView);

// Retrieve all Employees in database (ex: /api/employees)
api_router.get('/employees', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), employeeViews.getAllEmployeesView);
// Delete all open employees (for testing)
api_router.delete('/employees', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), employeeViews.deleteAllEmployeesView);
// Add an emplyee to the database
api_router.post('/addEmployee', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), employeeViews.addEmployeeView);
// Delete a specified employee
api_router.delete('/employees/:email', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), employeeViews.deleteEmployeeView);
// Update a specific employee
api_router.put('/employees/:email', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), employeeViews.updateSingleEmployeeView);
// Retrieve a specific Button (ex: /api/buttons/1)
api_router.get('/employees/:email', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), employeeViews.getSingleEmployeeView);
// Returns true if the employee has an open task
api_router.get('/hasTask/:_id', AuthenticationController.roleAuthorization(REQUIRE_ADMIN), employeeViews.hasTaskView);
// Delete the completed tasks Associated with an employee
api_router.delete('/deleteCompletedTasks/:_id', AuthenticationController.roleAuthorization(REQUIRE_ADMIN), employeeViews.deleteCompletedTasksView);


module.exports = api_router;

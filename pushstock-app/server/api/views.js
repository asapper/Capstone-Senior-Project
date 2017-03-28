/*
 * Filename:    views.js
 * Description: This file defines the views returned in response to API calls.
 *
 * Edit history:
 *
 * Editor       Date            Description
 * ------       --------        -----------
 * sapper       03/01/17        File created
 * rapp         03/13/17        Added task creation in response to singleClick call
 * rapp         03/13/17        Added task creation in response to singleClick call
 * Saul         03/16/17        Added view to get all employees in DB
 * Saul         03/20/17        Deleted all employees
 *
 */

const Button = require('../app/models/button');
const Task = require('../app/models/task');
const Employee = require('../app/models/employee');

const controller = require('./controller');


module.exports = {
    // Handle API authentication
    apiAuthProcedure: function(req, res, next) {
        next(); // next route
    },

    // Handle index view for API urls
    indexView: function(req, res) {
        res.json({ message: 'Hooray! Welcome to our API!' });
    },

    // Handle the processing of a Single Click received
    singleClickView: function(req, res) {
        // get the button's information
        reqMacAddr = req.body.macAddr;

        var resMessage; // The message to send back as a response
        // Checks whether the button exists and creates it if it doesn't
        var buttonQuery = Button.findOne({ macAddr: reqMacAddr });
        var buttonPromise = buttonQuery.exec(function(err, button) {
            if (err) {
                res.send(err);
            } else if (!button) {
                // No button found, so create a new one
                button = new Button({
                    macAddr: reqMacAddr,
                });

                // Save the new button and check for errors
                button.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        resMessage = 'New button created!';
                    }
                });
            } else {
                // Button already exists, if inactive mark as active
                if (button.isActive == false) {
                    button.isActive = true;
                    button.save();
                    // return message
                    res.json({ message: 'Button has been activated!' });
                }
                resMessage = 'Button already exists.';
            }
        });

        // Once the button is found or created, create a new task if one not already open
        buttonPromise.then(function(button) {
            Task.findOne({ button: button.id }, null, function(err, task) {
                if (err) {
                    res.send(err);
                } else if (!task) {
                    // No open task found, so create one
                    var newTask = new Task({ button: button.id });
                    newTask.save(function(err) {
                        if (err) {
                            res.send(err);
                        }
                    });
                    resMessage += " New task created!";
                } else {
                    // A task is already open for this button
                    resMessage += " There is already an open task for button " + button.id;
                }
            })
            .then(function(task) {
                res.json({ message: resMessage });
            });
        });
    },

    // Handle retrieving all the buttons stored
    getAllButtonsView: function(req, res) {
        // Find all buttons
        Button.find(function(err, buttons) {
            if (err) {
                res.send(err);
            } else {
                res.json(buttons);
            }
        });
    },

    getSingleButtonView: function(req, res) {
        Button.findOne({ macAddr: req.params.macAddr }, function(err, button) {
            if (err) {
                res.send(err);
            } else {
                res.json(button);
            }
        });
    },

    updateSingleButtonView: function(req, res) {
        button = Button.findOne({ macAddr: req.params.macAddr }, function(err, button) {
            if (err) {
                res.send(err);
            } else {
                button.description = req.body.description;
                button.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({ message: 'Button updated!' });
                    }
                });
            }
        });
    },

    addButtonView: function(req, res) {
        var response = controller.createButton(req.body.macAddr, req.body.description);
        res.send(response);
    },

    deleteButtonView: function(req, res){
      Button.remove({
        macAddr: req.params.macAddr
      }, function(err, button) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    },

    // Handle retreiving all the tasks stored along with their assigned employee
    getAllTasksView: function(req, res) {
        // Find all tasks and populate the employee name fields
        Task.find().populate('employee', 'firstname lastname').exec(function(err, tasks) {
            if (err) {
                res.send(err);
            } else {
                res.json(tasks);
            }
        });
    },

    // Delete all tasks (for testing)
    deleteAllTasksView: function(req, res) {
        Task.remove(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'All tasks removed.'});
            }
        });
    },

    // Handle retrieving all the employees stored
    getAllEmployeesView: function(req, res) {
        // Find all employees
        Employee.find(function(err, employees) {
            if (err) {
                res.send(err);
            } else {
                res.json(employees);
            }
        });
    },

    addEmployeeView: function(req, res) {
        // get the employee's information
        firstName = req.body.firstName;
        lastName = req.body.lastName;
        email = req.body.email;
        password = req.body.password;
        role = req.body.role;

        // validate employee information
        // ...validation here

        // create employee
        var response = controller.createEmployee(
            firstName, lastName, email, password, role);
        res.send(response);
    },

    // Delete all Employees (for testing)
    deleteAllEmployeesView: function(req, res) {
        Employee.remove(function(err) {
            if (err) {
                res.send(err);
			} else {
                res.send('DELETE request to homepage');
				res.json({ message: 'All employees removed.'});
			}
		});
	}
};

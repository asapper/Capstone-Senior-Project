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
 * Saul         03/16/17        Added view to get all employees in DB
 * Saul         03/20/17        Deleted all employees
 * Saul         03/27/17        Added DeleteButtonView
 * Saul         03/27/17        Added DeleteEmployeeView
 * Saul         03/29/17        Working updateSingleEmployeeView
 */

const Button = require('../app/models/button');
const Task = require('../app/models/task');
const Employee = require('../app/models/employee');


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
                    dateLastUsed: Date.now()
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
                // button used, update field
                button.dateLastUsed = Date.now();
                button.save(function(err) {
                    if (err) res.send(err);
                });
                // Button already exists, if inactive mark as active
                if (!button.isActive && button.description != "" && !button.dateLastConfigured) {
                    button.isActive = true;
                    button.dateLastConfigured = Date.now();
                    button.save(function(err) {
                        if (err) {
                            res.send(err);
                        } else {
                            resMessage = 'Button has been activated!';
                        }
                    });
                } else {
                    resMessage = 'Button already exists.';
                }
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

    // Handle retrieving all assigned buttons
    getAssignedButtonsView: function(req, res) {
        Button.find({ isActive: true }, 'macAddr', function(err, buttons) {
            if (err) {
                res.send(err);
            } else {
                res.json(buttons);
            }
        });
    },

    // Handle retrieveing all unassigned buttons
    getUnassignedButtonsView: function(req, res) {
        // Find buttons that are: inactive and have not been configured. Only retrieve mac addresses
        Button.find({ isActive: false, description: "" }, 'macAddr', function(err, buttons) {
            if (err) {
                res.send(err);
            } else {
                res.json(buttons);
            }
        });
    },

    // Handle retrieving a single button
    getSingleButtonView: function(req, res) {
        Button.findOne({ macAddr: req.params.macAddr }, function(err, button) {
            if (err) {
                res.send(err);
            } else {
                res.json(button);
            }
        });
    },

    // Handle assigning a button
    assignButtonView: function(req, res) {
        // Retrieve button
        Button.findOne({ macAddr: req.body.macAddr }, function (err, button) {
            if (err) {
                res.send(err);
            } else {
                // Update description
                button.description = req.body.description;
                // Set last configured date
                button.dateLastConfigured = Date.now();
                // Set to active
                button.isActive = true;
                button.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({ message: 'Button assigned!' });
                    }
                });
            }
        });
    },

    // Handle unassigning a button
    unassignButtonView: function(req, res) {
        // Retrieve button
        Button.findOne({ macAddr: req.body.macAddr }, function(err, button) {
            if (err) {
                res.send(err);
            } else {
                // Update description
                button.description = "";
                // Set last configured date
                button.dateLastConfigured = Date.now();
                // Set to inactive
                button.isActive = false;
                button.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({ message: 'Button unassigned!' });
                    }
                });
            }
        });
    },

    // Handle updating a single button
    updateSingleButtonView: function(req, res) {
        Button.findOne({ macAddr: req.params.macAddr }, function(err, button) {
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
        // create new Button
        var newBtn = new Button();
        newBtn.macAddr = req.body.macAddr;
        newBtn.description = req.body.description;
        // save the Button and check for errors
        newBtn.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'New button created!' });
            }
        });
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
        var newEmployee = new Employee();
        newEmployee.email = email;
        newEmployee.password = password;
        newEmployee.profile = { firstName, lastName }
        newEmployee.role = role;
        // save the Button and check for errors
        newEmployee.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: "New employee created!" });
            }
        });
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
	},

    // Delete a specified Employee
    deleteEmployeeView: function(req, res){
      Employee.remove({
        email: req.params.email
      }, function(err, email) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    },

  // Update a specific employee
  updateSingleEmployeeView: function(req, res){
    employee = Employee.findOne({ email: req.body.oEmail }, function(err, employee) {
        if (err) {
            res.send(err);
        } else {
            employee.email = req.body.email;
            employee.profile.firstName = req.body.firstName;
            employee.profile.lastName  =  req.body.lastName;
            employee.role = req.body.role;
            employee.save(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'employee updated!' });
                }
            });
        }
    });
  },

  // Retrieve a specific employee
  getSingleEmployeeView: function(req, res) {

      Employee.findOne({ email: req.params.email }, function(err, employee) {
          if (err) {
              res.send(err);
          } else {
              res.json(employee);
              console.log("found employee: " + employee);
          }
      });
  }

};

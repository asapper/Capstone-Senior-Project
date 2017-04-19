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

const CREATED_STATUS = '201';
const BAD_REQUEST_STATUS = '400';

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

        // Checks whether the button exists and creates it if it doesn't
        Button.findOne({ macAddr: reqMacAddr }, function(err, button) {
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
                        res.status(CREATED_STATUS).send({ message: 'New button created!' });
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
                            res.json({ message: 'Button has been activated!' });
                        }
                    });
                } else if (button.isActive) { // button is active, create task
                    // if button has open task don't create another task
                    Task.findOne({ button: button._id, isOpen: true }, function(err, task) {
                        if (err) {
                            res.send(err);
                        } else if (!task) { // create task
                            // Order in criteria for assigning task:
                            // 1. Find one(s) who have never been assigned a task
                            // 2. Find one(s) who has finished a task the longest time ago
                            // 3. Find admin to assign task to

                            // assign task to appropriate employee
                            Task.distinct("employee", function(err, tasks) {
                                if (err) {
                                    res.send(err);
                                } else if (tasks.length > 0) {
                                    // get all non-admin employees not in task set
                                    Employee.find({ role: { $ne: "Admin"}, _id: { $nin: tasks } },
                                            null, { sort: { createdAt: 1 }}, function(err1, employees) {
                                        if (err1) {
                                            res.send(err1);
                                        } else if (employees.length > 0) { // employees never assigned a task
                                            // Criteria #1
                                            // assign task to first employee (already sorted per latest update date)
                                            var newTask = new Task();
                                            newTask.button = button._id;
                                            newTask.employee = employees[0]._id;
                                            newTask.save(function(err2) {
                                                if (err2) {
                                                    res.send(err2);
                                                } else {
                                                    res.status(CREATED_STATUS).send({ message: "Task assigned to worker who has never been assigned a task." });
                                                }
                                            });
                                        } else { // all have been assigned a task
                                            // get all closed tasks
                                            Task.find({ isOpen: false }, null, { sort: { dateClosed: -1 }}, function(err3, tasks2) {
                                                if (err3) {
                                                    res.send(err3);
                                                } else if (tasks2.length > 0) { // some closed tasks
                                                    // Criteria #2
                                                    // assign task to first employee (already sorted)
                                                    var newTask = new Task();
                                                    newTask.button = button._id;
                                                    newTask.employee = tasks2[0].employee;
                                                    newTask.save(function(err5) {
                                                        if (err5) {
                                                            res.send(err5);
                                                        } else {
                                                            res.status(CREATED_STATUS).send({ message: "(Some tasks closed) Task assigned to worker who finished a task the longest ago." });
                                                        }
                                                    });
                                                } else { // no closed tasks
                                                    // get all open tasks
                                                    Task.aggregate([
                                                        { 
                                                            $group:
                                                            {
                                                                _id: "$employee",
                                                                count: { $sum:1 },
                                                                maxDate: { $max: "$createdAt" }
                                                            }
                                                        },
                                                        {
                                                            $sort:
                                                            {
                                                                count: 1,
                                                                maxDate: 1
                                                            }
                                                        }
                                                    ], function(err9, employeesOpen) {
                                                        if (err9) {
                                                            res.send(err9);
                                                        } else {
                                                            // Criteria #2 - assign task to first employee (already sorted)
                                                            var newTask = new Task();
                                                            newTask.button = button._id;
                                                            newTask.employee = employeesOpen[0]._id;;
                                                            newTask.save(function(err10) {
                                                                if (err10) {
                                                                    res.send(err10);
                                                                } else {
                                                                    res.status(CREATED_STATUS).send({ message: "(All workers have open tasks) Task assigned to worker with least tasks or task assigned the longest ago." });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                } else { // no tasks have ever been created
                                    // criteria #1
                                    Employee.find({ role: { $ne: "Admin" }}, null, { sort: { createdAt: 1 }}, function(err11, employees5) {
                                        if (err11) {
                                            res.send(err11);
                                        } else if (employees5.length > 0) {
                                            // assign task to first employee
                                            var newtask = new Task();
                                            newtask.button = button._id;
                                            newtask.employee = employees5[0]._id;
                                            newtask.save(function(err12) {
                                                if (err12) {
                                                    res.send(err12);
                                                } else {
                                                    res.status(CREATED_STATUS).send({ message: "(No tasks ever) Task assigned to worker who has never been assigned a task." });
                                                }
                                            });
                                        } else { // no non-admin employees
                                            // else, no worker available for task
                                            // assign task to admin
                                            Employee.find({ role: { $eq: "Admin" }}, null, { sort: { createdAt: 1 }}, function(err13, employees6) {
                                                if (err13) {
                                                    res.send(err13);
                                                } else if (employees6.length > 0) { // there should always be at least one admin
                                                    // Criteria #3
                                                    // assign task to first employee (already sorted)
                                                    var newTask = new Task();
                                                    newTask.button = button._id;
                                                    newTask.employee = employees6[0]._id;
                                                    newTask.save(function(err14) {
                                                        if (err14) {
                                                            res.send(err14);
                                                        } else {
                                                            res.status(CREATED_STATUS).send({ message: "(No tasks ever) Task assigned to admin." });
                                                        }
                                                    });
                                                } else {
                                                    res.json({ message: "ERROR: No admin account." });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else { // open task exists for this button
                            res.json({ message: "Task not created, open task already exists." });
                        }
                    });
                } else { // button has not been configured yet
                    res.json({ message: "Button has not been configured." });
                }
            }
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

    // Handle retrieving all active buttons stored (without an open task)
    getAllActiveButtonsView: function(req, res) {
        // find all active buttons without an open task
        Task.distinct("button", { isOpen: true }, function(err, openTasksButtons) {
            Button.find({ isActive: true, _id: { $nin: openTasksButtons } }, function(err, buttons) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(buttons);
                }
            });
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
        Button.find({ isActive: false, dateLastConfigured: null, dateLastUsed: { $ne: null } }, 'macAddr', function(err, buttons) {
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
                res.status(CREATED_STATUS).send({ message: 'New button created!' });
            }
        });
    },

    deleteButtonView: function(req, res){
      Button.remove({
        macAddr: req.params.macAddr
      }, function(err, button) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted' });
            }
        });
    },

    // Handle retreiving all the tasks stored along with their assigned employee
    getAllTasksView: function(req, res) {
        // Find all tasks and populate the employee and button fields
        Task.find()
            .populate('button')
            .populate('employee')
            .exec(function(err, tasks) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(tasks);
                }
            });
    },

    // Handle creating a new task
    addTaskView: function(req, res) {
        // check if both required parameters exist
        if (typeof req.body.button_mac_addr === 'undefined' ||
                typeof req.body.employee_email === 'undefined' ||
                req.body.button_mac_addr === '' ||
                req.body.employee_email === '') {
            res.status(BAD_REQUEST_STATUS).send({ error: 'Request missing required parameter(s).' });
            return;
        } else if (req.body.button_mac_addr === null || req.body.employee_email === null) {
            res.status(BAD_REQUEST_STATUS).send({ error: 'Request with null required parameter(s).' });
            return;
        }

        // retrieve button with given mac address
        Button.findOne({ macAddr: req.body.button_mac_addr }, function(err, button) {
            if (err) {
                res.send(err);
            } else { // button exists
                if (button.isActive !== true) {
                    res.status(BAD_REQUEST_STATUS).send({ error: 'Button not active.' });
                } else {
                    // retrieve employee with given email address
                    Employee.findOne({ email: req.body.employee_email }, function(err, employee) {
                        if (err) {
                            res.send(err);
                        } else { // employee exists
                            // create task
                            var newTask = new Task();
                            newTask.button = button._id;
                            newTask.employee = employee._id;
                            newTask.save(function(err) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.status(CREATED_STATUS).send({ message: 'New task created!' });
                                }
                            });
                        }
                    });
                }
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
          }
      });
  }

};

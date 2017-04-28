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
 * Saul         04/11/17        Notifications change for success and failure
 * Saul         04/18/17        If an error occurs deleting an employee null is
 *                              null is returned.
 * Saul         04/20/17        markTaskCompleteView implemented
 * Saul         04/20/17        getOpenTasksView implemented
 * Saul         04/20/17        getComnpleteTasksView implemented
 */

const Button = require('../app/models/button');
const Task = require('../app/models/task');
const Employee = require('../app/models/employee');
const controller = require('./controller');

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
                res.json({ error: err.message });
            } else if (!button) {
                // No button found, so create a new one
                button = new Button({
                    macAddr: reqMacAddr,
                    dateLastUsed: Date.now()
                });

                // Save the new button and check for errors
                button.save(function(err) {
                    if (err) {
                        res.json({ error: err.message });
                    } else {
                        res.status(CREATED_STATUS).send({ message: 'New button created!' });
                    }
                });
            } else {
                // button used, update field
                button.dateLastUsed = Date.now();
                button.save(function(err) {
                    if (err) {
                        res.json({ error: err.message });
                    }
                });
                // Button already exists, if inactive mark as active
                if (!button.isActive && button.description != "" && !button.dateLastConfigured) {
                    button.isActive = true;
                    button.dateLastConfigured = Date.now();
                    button.save(function(err) {
                        if (err) {
                            res.json({ error: err.message });
                        } else {
                            res.json({ message: 'Button has been activated!' });
                        }
                    });
                } else if (button.isActive) { // button is active, create task
                    // if button has open task don't create another task
                    Task.findOne({ button: button._id, isOpen: true }, function(err, task) {
                        if (err) {
                            res.json({ error: err.message });
                        } else if (!task) { // create task
                            // Order in criteria for assigning task:
                            // 1. Find one(s) who have never been assigned a task
                            // 2. Find one(s) who has finished a task the longest time ago
                            // 3. Find admin to assign task to

                            // assign task to appropriate employee
                            Task.distinct("employee", function(err, tasks) {
                                if (err) {
                                    res.json({ error: err.message });
                                } else if (tasks.length > 0) {
                                    // get all non-admin employees not in task set
                                    Employee.find({ role: { $ne: "Admin"}, _id: { $nin: tasks } },
                                            null, { sort: { createdAt: 1 }}, function(err, employees) {
                                        if (err) {
                                            res.json({ error: err.message });
                                        } else if (employees.length > 0) { // employees never assigned a task
                                            // Criteria #1
                                            // assign task to first employee (already sorted per latest update date)
                                            var newTask = controller.createNewTask(button._id, employees[0]._id);
                                            newTask.save(function(err) {
                                                if (err) {
                                                    res.json({ error: err.message });
                                                } else {
                                                    res.status(CREATED_STATUS).send({ message: "Task assigned to worker who has never been assigned a task." });
                                                }
                                            });
                                        } else { // all have been assigned a task
                                            // get all closed tasks
                                            Task.find({ isOpen: false }, null, { sort: { dateClosed: -1 }}, function(err, tasks) {
                                                if (err) {
                                                    res.json({ error: err.message });
                                                } else if (tasks.length > 0) { // some closed tasks
                                                    // Criteria #2
                                                    // assign task to first employee (already sorted)
                                                    var newTask = controller.createNewTask(button._id, tasks[0].employee);
                                                    newTask.save(function(err) {
                                                        if (err) {
                                                            res.json({ error: err.message });
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
                                                    ], function(err, employeesOpen) {
                                                        if (err) {
                                                            res.json({ error: err.message });
                                                        } else {
                                                            // Criteria #2 - assign task to first employee (already sorted)
                                                            var newTask = controller.createNewTask(button._id, employeesOpen[0]._id);
                                                            newTask.save(function(err) {
                                                                if (err) {
                                                                    res.json({ error: err.message });
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
                                    Employee.find({ role: { $ne: "Admin" }}, null, { sort: { createdAt: 1 }}, function(err, employees) {
                                        if (err) {
                                            res.json({ error: err.message });
                                        } else if (employees.length > 0) {
                                            // assign task to first employee
                                            var newTask = controller.createNewTask(button._id, employees[0]._id);
                                            newTask.save(function(err) {
                                                if (err) {
                                                    res.json({ error: err.message });
                                                } else {
                                                    res.status(CREATED_STATUS).send({ message: "(No tasks ever) Task assigned to worker who has never been assigned a task." });
                                                }
                                            });
                                        } else { // no non-admin employees
                                            // else, no worker available for task
                                            // assign task to admin
                                            Employee.find({ role: { $eq: "Admin" }}, null, { sort: { createdAt: 1 }}, function(err, employees) {
                                                if (err) {
                                                    res.json({ error: err.message });
                                                } else if (employees.length > 0) { // there should always be at least one admin
                                                    // Criteria #3
                                                    // assign task to first employee (already sorted)
                                                    var newTask = controller.createNewTask(button._id, employees[0]._id);
                                                    newTask.save(function(err) {
                                                        if (err) {
                                                            res.json({ error: err.message });
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
                res.json({ error: err.message });
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
                    res.json({ error: err.message });
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
                res.json({ error: err.message });
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
                res.json({ error: err.message });
            } else {
                res.json(buttons);
            }
        });
    },

    // Handle retrieving a single button
    getSingleButtonView: function(req, res) {
        Button.findOne({ macAddr: req.params.macAddr }, function(err, button) {
            if (err) {
                res.json({ error: err.message });
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
                res.json({ error: err.message });
            } else {
                // Update description
                button.description = req.body.description;
                // Set last configured date
                button.dateLastConfigured = Date.now();
                // Set to active
                button.isActive = true;
                button.save(function(err) {
                    if (err) {
                        res.json({ error: err.message });
                    } else {
                        res.json({ message: 'Button ' + req.body.macAddr + ' has been assigned!' });
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
                res.json({ error: err.message });
            } else {
                // Update description
                button.description = "";
                // Set last configured date
                button.dateLastConfigured = Date.now();
                // Set to inactive
                button.isActive = false;
                button.save(function(err) {
                    if (err) {
                        res.json({ error: err.message });
                    } else {
                        res.json({ message: 'Button ' + req.body.macAddr + ' has been unassigned.' });
                    }
                });
            }
        });
    },

    // Handle updating a single button
    updateSingleButtonView: function(req, res) {
        Button.findOne({ macAddr: req.params.macAddr }, function(err, button) {
            if (err) {
                res.json({ error: err.message });
            } else {
                button.description = req.body.description;
                button.save(function(err) {
                    if (err) {
                        res.json({ error: err.message });
                    } else {
                        res.json({ message: 'Button ' + req.params.macAddr + ' updated successfully!' });
                    }
                });
            }
        });
    },

    // Handle creating a new button with the given fields
    addButtonView: function(req, res) {
        // create new Button
        var newBtn = controller.createNewButton(req.body.macAddr, req.body.description);
        // save the Button and check for errors
        newBtn.save(function(err) {
            if (err) {
                res.json({ error: err.message });
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
                res.json({ error: err.message });
            } else {
                res.json({ message: 'Button deleted with MAC address ' + req.params.macAddr});
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
                    res.json({ error: err.message });
                } else {
                    res.json(tasks);
                }
            });
    },

    // Handle retrieving a single task
    getSingleTaskView: function(req, res) {
        Task.findById(req.params.taskId)
            .populate('button')
            .populate('employee')
            .exec(function(err, task) {
                if (err) {
                    res.json({ error: err.message });
                } else {
                    res.json(task);
                }
            });
    },

    // Handle retrieveing all ope tasks
    getOpenTasksView: function(req, res) {
        // Find buttons that are: inactive and have not been configured. Only retrieve mac addresses
        Task.find({ isOpen: true })
        .populate('button')
        .populate('employee')
        .exec(function(err, tasks) {
            if (err) {
                res.json({ error: err.message });
            } else {
                res.json(tasks);
            }
        });
    },

    // Handle retrieveing all Completed Tasks
    getCompletedTasksView: function(req, res) {
        // Find buttons that are: inactive and have not been configured. Only retrieve mac addresses
        Task.find({ isOpen: false })
        .populate('button')
        .populate('employee')
        .exec(function(err, tasks) {
            if (err) {
                res.json({ error: err.message });
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
                res.json({ error: err.message });
            } else { // button exists
                if (button.isActive !== true) {
                    res.status(BAD_REQUEST_STATUS).send({ error: 'Button not active.' });
                } else {
                    // retrieve employee with given email address
                    Employee.findOne({ email: req.body.employee_email }, function(err, employee) {
                        if (err) {
                            res.json({ error: err.message });
                        } else { // employee exists
                            // create task
                            var newTask = controller.createNewTask(button._id, employee._id);
                            newTask.save(function(err) {
                                if (err) {
                                    res.json({ error: err.message });
                                } else {
                                    res.status(CREATED_STATUS).json({ message: 'New task created!' });
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
                res.json({ error: err.message });
            } else {
                res.json({ message: 'All tasks removed.'});
            }
        });
    },

    // Delete a single task
    deleteTaskView: function(req, res){
        Task.remove({ _id: req.params.taskId }, function(err, button) {
            if (err) {
                res.json({ error: err.message });
            } else {
                res.json({ message: 'Task deleted successfully.' });
            }
        });
    },

    // Update a task
    reassignTaskView: function(req, res) {
        // find task
        Task.findOne({ _id: req.body.task_id }, function(err, task) {
            if (err) {
                res.json({ error: err.message });
            } else {
                // find employee
                Employee.findOne({ email: req.body.employee_email }, function(err, employee) {
                    if (err) {
                        res.json({ error: err.message });
                    } else {
                        // update employee in task
                        task.employee = employee._id;
                        task.save(function(err) {
                            if (err) {
                                res.json({ error: err.message });
                            } else {
                                res.json({ message: 'Task reassigned to ' + req.body.employee_email + '!'});
                            }
                        });
                    }
                });
            }
        });
    },

    // Marks a task as completed
    markTaskCompleteView: function(req, res) {
      Task.findOne({ _id: req.params._id }, function(err, task){
        if(err){
          res.json({ message: "Error occured.. task not found"});
        }
        else{
          task.isOpen = false;
          task.dateClosed = new Date();
          task.save(function(err) {
              if (err) {
                  res.json({ error: "Task found but not set to complete"});
              } else {
                  res.json({ message: "Task marked complete"});
              }
          });
        }
      });
    },

    // Handle retrieving all the employees stored
    getAllEmployeesView: function(req, res) {
        // Find all employees
        Employee.find(function(err, employees) {
            if (err) {
                res.json({ error: err.message });
            } else {
                res.json(employees);
            }
        });
    },

    addEmployeeView: function(req, res) {
        // create employee
        var newEmployee = controller.createNewEmployee(
                req.body.email,
                req.body.password,
                req.body.firstName,
                req.body.lastName,
                req.body.role);
        // save the Button and check for errors
        newEmployee.save(function(err) {
            if (err) {
                res.json({ error: err.message });
            } else {
                res.json({ message: "New employee created: " + req.body.firstName + " " + req.body.lastName });
            }
        });
    },

    // Delete all Employees (for testing)
    deleteAllEmployeesView: function(req, res) {
        Employee.remove(function(err) {
            if (err) {
                res.json({ error: err.message });
			} else {
				res.json({ message: 'All employees removed.'});
			}
		});
	},

    // Delete a specified Employee
    deleteEmployeeView: function(req, res){
      Employee.remove({
        _id: req.params._id
      }, function(err, _id) {
            if (err) {
                res.json({ error: err.message });
            } else {
                res.json({ message: 'Employee deleted'});
            }
        });
    },

  // Update a specific employee
  updateSingleEmployeeView: function(req, res){
    employee = Employee.findOne({ email: req.body.oEmail }, function(err, employee) {
        if (err) {
            res.json({ error: err.message });
        } else {
            employee.email = req.body.email;
            employee.profile.firstName = req.body.firstName;
            employee.profile.lastName  =  req.body.lastName;
            employee.role = req.body.role;
            employee.save(function(err) {
                if (err) {
                    res.json({ error: err.message });
                } else {
                    res.json({ message: 'Employee updated!' });
                }
            });
        }
    });
  },

  // Retrieve a specific employee
  getSingleEmployeeView: function(req, res) {

      Employee.findOne({ email: req.params.email }, function(err, employee) {
          if (err) {
              res.json({ error: err.message });
          } else {
              res.json(employee);
          }
      });
  },

  // If the employee has an assoiciated task return true else false
  hasTaskView: function(req, res) {

    Task.find({ employee: req.params._id, isOpen: true }, function(err, tasks) {
        if (err) {
            res.send(err);
        }
        else if(tasks.length == 0){
          console.log(tasks);
          console.log(tasks.length);
            res.json({ message: 'false' });
        }
        else{
            console.log(tasks);
            console.log(tasks.length);
            res.json({ message: 'true' });
        }
    });
  },

  // Delete a specified Employee
  deleteCompletedTasksView: function(req, res){
    Task.remove({
      employee: req.params._id
    }, function(err, _id) {
          if (err) {
              res.send(err);
          } else {
              res.json({ message: 'Successfully deleted' });
          }
      });
  }

};

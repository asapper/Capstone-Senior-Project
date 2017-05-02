/*
 * Filename: task.views.js
 * Description: This file defines the views associated with Task operations.
 *
 * Edit history:
 *
 * Editor       Date            Description
 * ------       --------        -----------
 * sapper       03/01/17        File created
 */

const Button = require('../app/models/button');
const Task = require('../app/models/task');
const Employee = require('../app/models/employee');
const controller = require('./controller');

const CREATED_STATUS = '201';
const BAD_REQUEST_STATUS = '400';

module.exports = {
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

};

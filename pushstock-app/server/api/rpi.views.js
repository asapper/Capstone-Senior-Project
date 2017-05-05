/*
 * Filename: rpi.views.js
 * Description: This file defines the views associated with RaspberryPi operations.
 *
 * Edit history:
 *
 * Editor       Date            Description
 * ------       --------        -----------
 * sapper       05/01/17        File created
 */

const Button = require('../app/models/button');
const Task = require('../app/models/task');
const Employee = require('../app/models/employee');
const controller = require('./controller');

const CREATED_STATUS = '201';

module.exports = {
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
                                    // get all workers not in task set
                                    Employee.find({ role: { $eq: "Worker"}, _id: { $nin: tasks } },
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
                                        } else { // all have, at some point, been assigned a task
                                            // get number of tasks open per employee
                                            // Order by these criteria (in this order break ties):
                                            // - number of open tasks
                                            // - task latest closed
                                            // - task latest assigned
                                            Task.aggregate([
                                                {
                                                    $group: {
                                                        _id: "$employee",
                                                        count: { $sum: {
                                                            $cond: [ { $eq: ["$isOpen", true] }, 1, 0 ] }
                                                        },
                                                        maxDateClosed: { $max: "$dateClosed" }, // date task closed
                                                        maxDate: { $max: "$createdAt" } // date task assigned
                                                    }
                                                },
                                                {
                                                    $sort: {
                                                        count: 1,
                                                        maxDateClosed: 1,
                                                        maxDate: 1
                                                    }
                                                }
                                            ], function(err, employeesOpen) {
                                                if (err) {
                                                    res.json({ error: err.message });
                                                } else {
                                                    // Criteria #2
                                                    // assign task to first employee (already sorted, even when there are ties)
                                                    var newTask = controller.createNewTask(button._id, employeesOpen[0]._id);
                                                    newTask.save(function(err) {
                                                        if (err) {
                                                            res.json({ error: err.message });
                                                        } else {
                                                            res.status(CREATED_STATUS).send({ message: "Task assigned to worker with least tasks" });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                } else { // no tasks have ever been created
                                    // criteria #1
                                    Employee.find({ role: { $eq: "Worker" }}, null, { sort: { createdAt: 1 }}, function(err, employees) {
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
    }

};

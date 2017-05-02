/*
 * Filename: button.views.js
 * Description: This file defines the views associated with button operations.
 *
 * Edit history:
 *
 * Editor       Date            Description
 * ------       --------        -----------
 * sapper       05/01/17        File created
 */

const Button = require('../app/models/button');
const Task = require('../app/models/task');
const controller = require('./controller');

const CREATED_STATUS = '201';

module.exports = {
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
    }

};

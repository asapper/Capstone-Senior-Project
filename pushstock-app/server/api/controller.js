/*
 * Filename:    controller.js
 * Description: This file defines the functionality used in the API views.
 *
 * Edit history:
 *
 * Editor       Date            Description
 * ------       --------        -----------
 * sapper       03/22/17        File created
 *
 */

const Button = require('../app/models/button');
const Task = require('../app/models/task');
const Employee = require('../app/models/employee');


module.exports = {
    // Handle Button creation
    createButton: function(macAddr, description=null) {
        // create new Button
        var newBtn = new Button();
        newBtn.macAddr = macAddr;
        // check if description was given
        if (description) {
            newBtn.description = description;
        }
        // save the Button and check for errors
        newBtn.save(function(err) {
            if (err) {
                return err;
            } else {
                return { message: 'New button created!' };
            }
        });
    },

    // Handle Task creation
    createTask: function(button) {
        var newTask = new Task({ button: button.id });
        // save Task and check for errors
        newTask.save(function(err) {
            if (err) {
                return err;
            } else {
                return { message: 'New task created!' };
            }
        });
    },

    // Handle Employee creation
    createEmployee: function(firstName, lastName, email, password, role) {
        // create new Button
        var newEmployee = new Employee();
        newEmployee.email = email;
        newEmployee.password = password;
        newEmployee.profile = { firstName, lastName }
        newEmployee.role = role;
        // save the Button and check for errors
        newEmployee.save(function(err) {
            if (err) {
                return err;
            } else {
                return { message: "New employee created!" };
            }
        });

    }
};

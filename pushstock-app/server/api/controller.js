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
    createNewTask: function(buttonId, employeeId) {
        var newTask = new Task();
        newTask.button = buttonId;
        newTask.employee = employeeId;
        return newTask;
    },

    createNewButton: function(macAddr, description) {
        var newButton = new Button();
        newButton.macAddr = macAddr;
        newButton.description = description;
        return newButton;
    },

    createNewEmployee: function(email, pswd, firstName, lastName, role) {
        var newEmployee = new Employee();
        newEmployee.email = email;
        newEmployee.password = pswd;
        newEmployee.profile = { firstName, lastName }
        newEmployee.role = role;
        return newEmployee;
    }
};

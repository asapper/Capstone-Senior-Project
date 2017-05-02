/*
 * Filename: employee.views.js
 * Description: This file defines the views associated with Employee operations.
 *
 * Edit history:
 *
 * Editor       Date            Description
 * ------       --------        -----------
 * sapper       03/01/17        File created
 */

const Task = require('../app/models/task');
const Employee = require('../app/models/employee');
const controller = require('./controller');

module.exports = {
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

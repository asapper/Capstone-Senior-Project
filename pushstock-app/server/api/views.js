/*
 * Filename:							views.js
 * Description:						This file defines the views returned in response to API calls.
 *
 * Edit history:
 *
 * Editor			Date				Description
 * ------			--------		-----------
 * sapper			03/01/17		File created
 * rapp				03/13/17		Added task creation in response to singleClick call
 * Saul       03/16/17    Added view to get all employees in DB
 * Saul       03/20/17    Deleted all employees
 *
 */
const Button = require('../app/models/button');
const Task = require('../app/models/task');
const Employee = require('../app/models/employee');



module.exports = {
    // Handle API authentication
    apiAuthProcedure: function(req, res, next) {
        // logging
        console.log('Some authentiation (should be) happening here...');
        next(); // next route
    },

    // Handle index view for API urls
    indexView: function(req, res) {
        console.log("GET: /api/ being accessed");
        res.json({ message: 'Hooray! Welcome to our API!' });
    },

    // Handle the processing of a Single Click received
    singleClickView: function(req, res) {
        // get the button's information
        reqButtonId = req.body.buttonid;
        reqClickTimestamp = req.body.click_timestamp;

        console.log("POST: Single Click by button " +
            reqButtonId + " at " + reqClickTimestamp);

				var button, // The button making the API call
						resMessage; // The message to send back as a response

				// Checks whether the button exists and creates it if it doesn't
				var buttonQuery = Button.findOne({ buttonId: reqButtonId });
				var buttonPromise = buttonQuery.exec(function(err, button) {
					if (err) {
						res.send(err);
					} else if (!button) {
						// No button found, so create a new one
						button = new Button({
							buttonId: reqButtonId,
							clickTimeStamp: reqClickTimestamp
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
						// Button already exists
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
						console.log(resMessage);
					});
				});
    },
    // Handle retrieving all the buttons stored
    getAllButtonsView: function(req, res) {
        console.log("GET: Returning list of buttons...");

        // Find all buttons
        Button.find(function(err, buttons) {
            if (err) {
                res.send(err);
            } else {
                res.json(buttons);
                console.log('Returning a list of all the buttons in the database!');
            }
        });
    },

		// Handle retreiving all the tasks stored along with their assigned employee
		getAllTasksView: function(req, res) {
			console.log("GET: Returning list of tasks...");

			// Find all tasks and populate the employee name fields
			Task.find().populate('employee', 'firstname lastname').exec(function(err, tasks) {
				if (err) {
					res.send(err);
				} else {
					res.json(tasks);
					console.log('Returning a list of all tasks (along with their employees) in the database!');
				}
			});
		},

		// Delete all tasks (for testing)
		deleteAllTasksView: function(req, res) {
			console.log("DELETE: Deleting all tasks...");

			Task.remove(function(err) {
				if (err) {
					res.send(err);
				} else {
					res.json({ message: 'All tasks removed.'});
					console.log('All tasks removed.');
				}
			});
		},



    addButtonView: function(req, res) {
        // get the button's information
        buttonId = req.body.buttonId;
        clickTimestamp = req.body.clickTimestamp;
        description = req.body.buttonDescription;
        console.log("POST: button added through webapp " +
            buttonId + " at " + clickTimestamp);

        // validate button information
        // ...validation here

        // create new Button
        var newBtn = new Button();
        newBtn.buttonId = buttonId;
        newBtn.clickTimestamp = clickTimestamp;
        newBtn.buttonDescription = description;
        // save the Button and check for errors
        newBtn.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'New button created!' });
                console.log('New button created!');
            }
        });
    },

    // Handle retrieving all the employees stored
    getAllEmployeesView: function(req, res) {
        console.log("GET: Returning list of employees...");

        // Find all employees
        Employee.find(function(err, employees) {
            if (err) {
                res.send(err);
            } else {
                res.json(employees);
                console.log("Returning a list of all the employees in the database!");
            }
        });
    },

    addEmployeeView: function(req, res) {
        // get the button's information
        email = req.body.email;
        password = req.body.password;
        firstName = req.body.firstName;
        lastName = req.body.lastName;
        role = req.body.role;

        console.log("POST: Employee added through webapp " +
            email);

        // validate button information
        // ...validation here

        // create new Button
        var newEmployee = new Employee();
        newEmployee.email = email;
        newEmployee.password = password;
        newEmployee.profile = { firstName, lastName }
        newEmployee.role = role;
        // save the Button and check for errors
        newEmployee.save(function(err) {
            if (err) {
                res.send(err);
                console.log("Error creating the employee.");
                console.log(err);
            } else {
                res.json({ message: "New employee created!" });
                console.log("New employee created!");
            }
        });
    },

    // Delete all Employees (for testing)
		deleteAllEmployeesView: function(req, res) {
			console.log("DELETE: Deleting all employees...");

			Employee.remove(function(err) {
				if (err) {
					res.send(err);
				} else {
          res.send('DELETE request to homepage');
					res.json({ message: 'All employees removed.'});
					console.log('All employees removed.');
				}
			});
		}
};

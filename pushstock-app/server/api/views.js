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
 *
 */
const Button = require('../app/models/button');
const Task = require('../app/models/task');


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

        // validate button information
        // ...validation here
				// Check whether button exists
				Button
					.findOne({ buttonId: reqButtonId}, null, function(err, button) {
					if (err) {
						res.send(err);
					} else if (!button) {
						// No button found; create a new one
						button = new Button({ 
							buttonId: reqButtonId,
							clickTimestamp: reqClickTimestamp
						});

						// Save the new button and check for errors
						button.save(function(err) {
							if (err) {
								res.send(err);
							} else {
								//res.json({ message: 'New button created!' });
								resMessage = 'New button created!';
								//console.log('New button created!');
							}
						});
					} else {
						// Button already exists
						button = button;
						/*
						res.json({ message: 'Button already exists. :(' });
						console.log('Button already exists. :(');
						*/
						resMessage = 'Button already exists.';
					} 
					})
					.then(function(button) {
						// Check for open tasks associated with this button
						Task.findOne({ button: button.id }, null, function(err, task) {
							if (err) {
								res.send(err);
							} else if (!task) {
								// No task found; create a new onw
								var newTask = new Task({ button: button.id });
								newTask.save(function(err) {
									if (err) {
										res.send(err);
									} else {
										/*
										res.json({ message: 'New task created!' });
										console.log('New task created!');
										*/
										resMessage += '\nNew task created!';
									}
								});
							} else {
								// An open task is already associated with this button
								/*
								res.json({ message: 'This button has an open task' });
								console.log('This button has an open task');
								*/
								resMessage += '\nThis button already has an open task.';
							}
						})
						.then(function(task) {
							res.json({ message: resMessage });
							console.log(resMessage);
						});
					});

				//res.json({ message: resMessage });
				//console.log(resMessage);


				/*
        // create new Button
        var newBtn = new Button();
        newBtn.buttonId = buttonId;
        newBtn.clickTimestamp = clickTimestamp;

        // save the Button and check for errors
        newBtn.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'New button created!' });
                console.log('New button created!');
            }
        });
				*/
				
				/*
				// If no tasks associated with this button, make one
				//Task.findOne({ button: newButton.id }, null, function(err, task) {
				Task.findOne({ button: reqButtonId }, null, function(err, task) {
					if (err) {
						res.send(err);
					} else if (!task) {
						// No task found; create a new one with no assigned employee
						var newTask = new Task({ button: reqButtonId});
						newTask.save(function(err) {
							if (err) {
								res.send(err);
							} else {
								res.json({ message: 'New task created!' });
								console.log('New task created!');
							}
						});
					}
				});
				*/
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
		}
};

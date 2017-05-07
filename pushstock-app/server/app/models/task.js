/*
 * Filename:							task.js
 * Description:						This file provides a Task model to store tasks created by button presses
 *												and assigned to workers.
 *
 * Edit history:
 *
 * Editor			Date				Description
 * ------			--------		-----------
 * rapp				03/13/17		File created
 *
 */

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

const twilio = require('twilio');
const config = require('../../config/twilio.js');
const client = new twilio(config.accountSid, config.authToken);
const Employee = require('./employee');
const Button = require('./button');

//===========================
// Task Schema
//==========================
const TaskSchema = new Schema({
    // button associated with this task
	button:
    {
		type: ObjectId,
		ref: 'Button',
		required: true
	},
    // employee associated with this task
	employee: 
    {
		type: ObjectId,
		ref: 'Employee',
		required: true
	},
    // upon creation tasks are open
    isOpen:
    {
        type: Boolean,
        default: true
    },
    // date when task was marked as closed
    dateClosed:
    { 
        type: Date,
        default: null 
    }
}, { timestamps: true });

// Send notification after assigning task
TaskSchema.post('save', function(doc) {
    if (doc.isOpen) {
        // If employee has phone number, send notification
        Employee.findOne({ _id: doc.employee }, function(err, res) {
            // Check whether employee found without error
            if (err) {
                console.log(err);
            } else if (res) {
                // Check whether employee has a phone number
                if (res.phone) {
                    var name = '';
                    if (res.profile.firstName && res.profile.firstName !== '' && res.profile.firstName.length <= 25) {
                        name = ', ' + res.profile.firstName;
                    }
                    Button.findOne({ _id: doc.button }, function(err, btn) {
                        if (err) {
                            console.log(err);
                        } else if (btn) {
                            var desc = btn.description;
                            if (desc.length > 25) {
                                desc = desc.slice(0, 26) + '...';
                            }
                            var msg = 'Hello' + name + '! You have been assigned the task "' + desc + '".';
                            var receivingNumber = '+1' + res.phone;

                            client.messages.create({
                                body: msg,
                                to: receivingNumber,
                                from: config.sendingNumber
                            }).then((message) => console.log(message));
                        }
                    });
                } else {
                    var name = '';
                    if (res.profile.firstName && res.profile.lastName) {
                        name = res.profile.firstName + ' ' + res.profile.lastName + ' ';
                    }
                    console.log('Employee ' + name + 'has no phone number for notifications.');
                }
            } else {
                console.log('No new employee assigned to task.');
            }
        });
    }
});

module.exports = mongoose.model('Task', TaskSchema);

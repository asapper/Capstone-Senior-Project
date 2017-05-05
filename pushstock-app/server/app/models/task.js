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
    // If employee has phone number, send notification
    Employee.findOne({ _id: doc.employee }, function(err, res) {
        // Check whether employee found without error
        if (!err && res) {
            // Check whether employee has a phone number
            if (res.phone) {
                var name = '';
                if (res.profile.firstName && res.profile.firstname !== '') {
                    name = ', ' + res.profile.firstName;
                }
                var msg = 'Hello' + name + '! You have been assigned a new PushStock task.';
                var receivingNumber = '+1' + res.phone;

                client.messages.create({
                    body: msg,
                    to: receivingNumber,
                    from: config.sendingNumber
                }).then((message) => console.log(message));
            }
        }
    });
});

module.exports = mongoose.model('Task', TaskSchema);

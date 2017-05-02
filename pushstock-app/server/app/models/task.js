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

module.exports = mongoose.model('Task', TaskSchema);

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
	button: {
		type: ObjectId,
		ref: 'Button',
		required: true
	},
	employee: {
		type: ObjectId,
		ref: 'Employee',
		required: true
	}
});

module.exports = mongoose.model('Task', TaskSchema);

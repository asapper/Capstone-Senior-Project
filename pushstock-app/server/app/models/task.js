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
			ObjectId = Schema.Type.ObjectId;

// buttonId: {type: Number, required: true};
// employee: {
//		firstname: {type: String, required: true},
//		lastname: {type: String, required: true}
// };

//===========================
// Task Schema
//==========================
const TaskSchema = new Schema({
	/*
	taskId: {
		type: Number,
		unique: true,
		required: true
	},
	*/
	button: {
		type: ObjectId,
		ref: 'Button',
		required: true
	},
	employee: {
		type: ObjectId,
		ref: 'Employee',
		required: false
		/*
		set: function(newEmployee) {
			if (this !== null) {
				// Remove from previous employee's list of tasks

			}
			if (newEmployee !== null) {
				// Add to newEmployee's list of tasks
			}
		}
		*/
	}
});


// Use this instead of set for updating employee's tasks list?
/*
TaskSchema.pre('save', function(next) {
});
*/

// TODO save a Task document to a PastTasks collection when deleted?

module.exports = mongoose.model('Task', TaskSchema);

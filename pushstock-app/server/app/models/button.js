var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ButtonSchema = new Schema({
    buttonId: { type: String, unique: true },
    clickTimestamp: Date,
    buttonDescription: { type: String, default: "A description should go here!" }
});

module.exports = mongoose.model('Button', ButtonSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ButtonSchema = new Schema({
    macAddr: { type: String, unique: true, required: true },
    description: { type: String, default: "" },
    dateCreated: { type: Date, default: Date.now },
    dateLastUsed: { type: Date, default: null },
    dateLastConfigured: { type: Date, default: null },
    isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('Button', ButtonSchema);

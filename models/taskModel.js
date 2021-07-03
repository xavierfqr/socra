var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    location: String,
    duration: { type: Number, min: 0 },
    price: { type: Number, min: 0 },
    remote: { type: Number, min: 0, max: 100 },
    start: String,
    job: String,
    context: String,
    mission: String,
});

module.exports = mongoose.model("taskModel", taskSchema);
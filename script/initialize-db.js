// modules
const mongoose = require('mongoose');
const TaskModel = require("../models/task-model");
var data = require("../const/db-data");

mongoose.connect("/socra", { useUnifiedTopology: true,  useNewUrlParser: true });
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error to socra DB'));
 
db.once('open', function() {
    console.log("Connection Successful to socra DB!");
    
    // Create array of tasks model to be registered in the DB
    var tasksArray = [];
    for (var i = 0; i < 10; i++) {
        const task = new TaskModel({
            location: data.location[i],
            duration: data.duration[i],
            price: data.price[i],
            remote: data.remote[i],
            start: data.start[i],
            job: data.job[i],
            context: data.context[i],
            mission: data.mission[i],
            timestamp: Date.now(),
        });
        tasksArray.push(task);
    }

    // Iterates through the array and saves it in the DB
    var it = 0;
    for (const task of tasksArray) {
        task.save(function (err, res) {
            if (err) {
                return console.error(err);
            }
            console.log(res.job + " saved to tasks collection.");
            it++;
            if (it === tasksArray.length) {
                console.log("Finish to save tasks");
                db.close();
            }
        });
    }
});
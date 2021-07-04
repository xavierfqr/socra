// Set env variable for dev purpose
process.env.NODE_ENV = 'dev';

const mongoose = require('mongoose');
const TaskModel = require("../models/taskModel");

let config = require('config'); // We load the db location from the JSON files
mongoose.connect(config.DBHost, { useUnifiedTopology: true,  useNewUrlParser: true });

var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error to socra DB'));
 
db.once('open', function() {
    console.log("Connection Successful to socra DB!");
    
    // Create array of tasks model to be registered in the DB
    var tasksArray = [];
    for (var i = 0; i < 10; i++) {
        const task = new TaskModel({
            location: "Paris 3",
            duration: 1,
            price: 120,
            remote: 0,
            start: "ASAP",
            job: "Installation",
            context: "Installation",
            mission: "Installation",
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
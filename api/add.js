const express = require('express');
const router = express.Router();
const TaskModel = require("../models/taskModel");

// Add a task to the database
router.post('/task', async function(req, res) {
    const task = new TaskModel({
        location: req.body.location,
        duration: req.body.duration,
        price: req.body.price,
        remote: req.body.remote,
        start: req.body.start,
        job: req.body.job,
        context: req.body.context,
        mission: req.body.mission,
        timestamp: Date.now(),
    })
    await task.save();
    res.send(task);
});

module.exports = router;
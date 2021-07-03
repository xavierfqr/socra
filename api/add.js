const express = require('express');
const router = express.Router();
const TaskModel = require("../models/taskModel");

router.get('/task', async function(req, res) {
    const tasks = await TaskModel.find();
	res.send(tasks);
});

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
    })
    await task.save();
    res.send(task);
});

module.exports = router;
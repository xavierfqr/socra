const express = require('express');
const handleValidationError = require('../utils/handle-errors')
const router = express.Router();
const TaskModel = require("../models/task-model");

// Add a task to the database
router.post('/task', async function(req, res) {
    try {
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
        });
        await task.save();
        res.send(task);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return error = handleValidationError(error, res);
        } else {
            res.status(500).send({error: "An unknown error has occured."})
        }
    }
});

module.exports = router;
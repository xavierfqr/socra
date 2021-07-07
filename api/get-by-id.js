const express = require('express');
const router = express.Router();
const TaskModel = require("../models/task-model");
var mongoose = require('mongoose');

// Get by id
router.get('/tasks/:id', async function(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send({error: "The provided ID is not a valid mongoose ID"});
    }

    const task = await TaskModel.findById(req.params.id);
    if (task)
	    return res.send(task);
    else
        return next(new NotFoundException());
});

module.exports = router;
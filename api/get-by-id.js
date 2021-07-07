const express = require('express');
const router = express.Router();
const TaskModel = require("../models/task-model");

// Get by id
router.get('/tasks/:id', async function(req, res) {
    const task = await TaskModel.findById(req.params.id).exec();
	res.send(task);
});

module.exports = router;
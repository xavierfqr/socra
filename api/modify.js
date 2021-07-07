const express = require('express');
const router = express.Router();
const TaskModel = require("../models/task-model");
const mongoose = require('mongoose');

router.patch('/tasks/modify/:id', async function(req, res) {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send({error: "The provided ID is not a valid mongoose ID"});
    }

    const id = req.params.id;
    var postData = req.body;

    // Update timestamp
    postData.timestamp = Date.now();

	const post = await TaskModel.findByIdAndUpdate(id, postData, {new: true} );
    // Thanks to passing the new: true option,
    // our query results in an updated version of the entity.

    if (post) {
        return res.send(post);
    } else {
        return res.status(400).send({error: "Bad request"});
    }
});

module.exports = router;
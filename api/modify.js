const express = require('express');
const router = express.Router();
const TaskModel = require("../models/task-model");

router.patch('/tasks/modify/:id', async function(req, res) {

    const id = req.params.id;
    var postData = req.body;

    // Update timestamp
    postData.timestamp = Date.now();

	const post = await TaskModel.findByIdAndUpdate(id, postData, {new: true} );
    // Thanks to passing the new: true option,
    // our query results in an updated version of the entity.

    if (post) {
        res.send(post);
    } else {
        next(new PostNotFoundException(id));
    }
});

module.exports = router;
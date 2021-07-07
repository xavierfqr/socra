const TaskModel = require("../models/task-model");
const handleValidationError = require('../utils/handle-errors');
var mongoose = require('mongoose');
const orderTasksByKeywords = require("../services/search-service");


const addTask = async (req, res) => {
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
            return res.status(500).send({error: "An unknown error has occured."})
        }
    }
}

const getTaskById = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send({error: "The provided ID is not a valid mongoose ID"});
    }

    const task = await TaskModel.findById(req.params.id);
    if (task)
	    return res.send(task);
    else
        return next(new NotFoundException());
}

const getTasks = async (req, res) => {
    const tasks = await TaskModel.find().sort({ timestamp: "desc" });
	return res.send(tasks);
}

const modifyTaskById = async (req, res) => {

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
}

const searchTasks = async (req, res) => {
    if (req.query.search) {
        const keywordList = req.query.search.split(',');
        const taskList = await TaskModel.find();

        const result = orderTasksByKeywords(taskList, keywordList);
        console.log(result);
        res.send(result);
    } else {
        res.send();
    }
}

module.exports = {
    addTask,
    getTaskById,
    getTasks,
    modifyTaskById,
    searchTasks
}
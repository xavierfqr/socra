const TaskModel = require("../models/task-model");
const handleValidationError = require('../utils/handle-errors');
var mongoose = require('mongoose');
const orderTasksByKeywords = require("../services/search-service");
const generatePDF = require('../services/pdf-service')



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
        return res.status(400).send({error: "The provided ID is not a valid mongoose ID"});
    }

    const task = await TaskModel.findById(req.params.id);
    if (task)
	    return res.send(task);
    else
        return res.status(404).send({error: "Ressource not found. Id: " + req.params.id + ' does not exist'});
}

const getTasks = async (req, res) => {
    const tasks = await TaskModel.find().sort({ timestamp: "desc" });
	return res.send(tasks);
}

const modifyTaskById = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send({error: "The provided ID is not a valid mongoose ID"});
    }

    const id = req.params.id;
    var postData = req.body;
    // Update timestamp
    postData.timestamp = Date.now();

    try {
        // {new: true}: query results is in an updated version of the entity.
        const post = await TaskModel.findByIdAndUpdate(id, postData, {new: true, useFindAndModify: false} );
        if (post) {
            return res.send(post);
        } else {
            return res.status(404).send({error: "Ressource not found. Id: " + req.params.id + ' does not exist'});
        }
    } catch (error) {
        console.log(error.name);
        if (error.name === 'ValidationError') {
            return error = handleValidationError(error, res);
        } else if (error.name === 'CastError') {
            return res.status(400).send({error: "Cast error, please check the type of your body request"});
        } else {
            return res.status(500).send({error: "An unknown error has occured."})
        }
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

// Get PDF with task information
const getPdfTask = async (req, res) => {
    // if the request does not contain valid mongoose ID then status 400
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send({error: "The provided ID is not a valid mongoose ID"});
    }
    // Get the task matching the id with only interesting fields for the PDF
    const taskInfo = await TaskModel.findById(req.params.id, 'location duration price remote start job context mission').exec();

    // if the id does not match any existing one then 404
    if (!taskInfo) {
        return res.status(404).send({error: "This task does not exists. Id: " + req.params.id + ' does not exist'});
    }

    const filename = 'taskInfo';
    const pdfStream = await generatePDF(filename, taskInfo.toObject());

    // return the PDF (automatically downloaded in browser)
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfStream),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=' + filename + '.pdf',
      })
      .end(pdfStream);
}

module.exports = {
    addTask,
    getTaskById,
    getTasks,
    modifyTaskById,
    searchTasks,
    getPdfTask
}
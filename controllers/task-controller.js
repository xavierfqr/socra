const TaskModel = require("../models/task-model");
const errorHandler = require('../utils/handle-errors');
var mongoose = require('mongoose');
const orderTasksByKeywords = require("../services/search-service");
const PDFservice = require('../services/pdf-service')


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
            return error = errorHandler.handleValidationError(error, res);
        } else {
            return error = errorHandler.handleUnknownError(res);
        }
    }
}

const getTaskById = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return error = errorHandler.handleMongooseIdError(res, req.params.id);
    }

    const task = await TaskModel.findById(req.params.id);
    if (task)
        return res.send(task);
    else
        return error = errorHandler.handleInvalidIdError(res, req.params.id);
}

const getTasks = async (req, res) => {
    const tasks = await TaskModel.find().sort({ timestamp: "desc" });
	return res.send(tasks);
}

const modifyTaskById = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return error = errorHandler.handleMongooseIdError(res, req.params.id);
    }

    const id = req.params.id;
    var postData = req.body;
    // Update timestamp
    postData.timestamp = Date.now();

    try {
        // {new: true}: query results is in an updated version of the entity.
        const post = await TaskModel.findByIdAndUpdate(id, postData, {new: true, runValidators: true, useFindAndModify: false} );
        if (post) {
            return res.send(post);
        } else {
            return error = errorHandler.handleInvalidIdError(res, req.params.id);
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            return error = errorHandler.handleValidationError(error, res);
        } else if (error.name === 'CastError') {
            return res.status(400).send({error: "Cast error, please check the type of your body request"});
        } else {
            return error = errorHandler.handleUnknownError(res);
        }
    }
}

const searchTasks = async (req, res) => {
    const taskList = await TaskModel.find();
    
    if (req.query.search) {
        const keywordList = req.query.search.split(',');

        const result = orderTasksByKeywords(taskList, keywordList);
        res.send(result);
    } else {
        res.send(taskList);
    }
}

// Get PDF with task information
const getPdfTask = async (req, res) => {
    // if the request does not contain valid mongoose ID then status 400
    if (!mongoose.isValidObjectId(req.params.id)) {
        return error = errorHandler.handleMongooseIdError(res, req.params.id);
    }
    // Get the task matching the id with only interesting fields for the PDF
    const taskInfo = await TaskModel.findById(req.params.id, 'location duration price remote start job context mission').exec();

    // if the id does not match any existing one then 404
    if (!taskInfo) {
        return error = errorHandler.handleInvalidIdError(res, req.params.id);
    }

    const filename = 'taskInfo';
    const pdfStream = await PDFservice.generatePDF(filename, taskInfo.toObject());

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
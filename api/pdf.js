const express = require('express');
const router = express.Router();
const generatePDF = require('../services/pdf-generator')
const TaskModel = require("../models/task-model");
const mongoose = require("mongoose");

router.get('/pdf/:id', async function(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send({error: "The provided ID is not a valid mongoose ID"});
    }
    const taskInfo = await TaskModel.findById(req.params.id, 'location duration price remote start job context mission').exec();

    if (!taskInfo) {
        return res.status(404).send({error: "This task does not exists. Id: " + req.params.id + ' does not exist'});
    }

    const filename = 'taskInfo';
    const pdfStream = await generatePDF(filename, taskInfo.toObject());

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfStream),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=' + filename + '.pdf',
      })
      .end(pdfStream);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const TaskModel = require("../models/task-model");
const orderTasksByKeywords = require("../services/search-service");

router.get("/tasks/search/keywords", async function(req, res) {
    if (req.query.search) {
        const keywordList = req.query.search.split(',');
        const taskList = await TaskModel.find();

        const result = orderTasksByKeywords(taskList, keywordList);
        console.log(result);
        res.send(result);
    } else {
        res.send();
    }
})

module.exports = router;
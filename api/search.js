const express = require('express');
const router = express.Router();
const TaskModel = require("../models/task-model");
const {searchTasks} = require('../controllers/task-controller');

router.get("/tasks/search/keywords", searchTasks)


module.exports = router;
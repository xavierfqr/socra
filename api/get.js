const express = require('express');
const router = express.Router();
const {getTasks} = require('../controllers/task-controller');

//Get all tasks
router.get('/tasks', getTasks);


module.exports = router;
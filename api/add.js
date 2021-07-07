const express = require('express');
const router = express.Router();
const {addTask} = require('../controllers/task-controller');

// Add a task to the database
router.post('/task', addTask);


module.exports = router;
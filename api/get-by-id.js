const express = require('express');
const router = express.Router();
const {getTaskById} = require('../controllers/task-controller')

// Get by id
router.get('/tasks/:id', getTaskById);

module.exports = router;
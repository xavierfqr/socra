const express = require('express');
const router = express.Router();
const {modifyTaskById} = require('../controllers/task-controller');

//Modify task by id
router.patch('/tasks/modify/:id', modifyTaskById);


module.exports = router;
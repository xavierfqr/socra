const express = require('express');
const router = express.Router();
const {unused, getPdfTask} = require('../controllers/task-controller');

router.get('/pdf/:id', getPdfTask);

module.exports = router;
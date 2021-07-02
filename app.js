var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/socra", { useUnifiedTopology: true,  useNewUrlParser: true });
var taskSchema = require("./models/taskSchema");

app.use(require('./api/add'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
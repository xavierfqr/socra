var express = require('express');
var app = express();
var mongoose = require('mongoose');
let config = require('config'); // We load the db location from the JSON files
mongoose.connect(config.DBHost, { useUnifiedTopology: true,  useNewUrlParser: true });

// To parse req.body
app.use(express.json());
app.use(require('./api/add'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app; // for testing
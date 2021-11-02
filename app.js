// Get dependencies
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocs = YAML.load('./swagger.yml');
const mongoose = require('mongoose');
const cors = require('cors');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


var connectString = "mongodb://10.0.1.52/socra";

// check if testing, and accord database
/*if (process.argv[0] === "node")
    connectString += "socra";
else
    connectString += "socra-test";*/

mongoose.connect(connectString, { useUnifiedTopology: true,  useNewUrlParser: true });

var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error to socra DB'));

// To parse req.body
app.use(cors());
app.use(express.json());
app.use(require('./api/add'));
app.use(require('./api/get'));
app.use(require('./api/get-by-id'));
app.use(require('./api/pdf'));
app.use(require('./api/search'));
app.use(require('./api/modify'));

app.listen(3000, function () {
    console.log('App is listening on port 3000');
});

module.exports = app; // for testing
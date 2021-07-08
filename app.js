// Get dependencies
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const mongoose = require('mongoose');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


var connectString = "mongodb://localhost:27017/";

// check if testing, and accord database
if (process.argv[0] === "node")
    connectString += "socra";
else
    connectString += "socra-test";

mongoose.connect(connectString, { useUnifiedTopology: true,  useNewUrlParser: true });

// To parse req.body
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
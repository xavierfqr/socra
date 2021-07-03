const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

const swaggerDocs = require('./swagger.json');

const mongoose = require('mongoose');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let config = require('config'); // We load the db location from the JSON files
mongoose.connect(config.DBHost, { useUnifiedTopology: true,  useNewUrlParser: true });

// To parse req.body
app.use(express.json());
app.use(require('./api/add'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app; // for testing
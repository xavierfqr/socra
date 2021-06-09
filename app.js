var express = require('express');
var app = express();

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true }, function(error, client) {
    if (error) return funcCallback(error);
    var db = client.db('socra');
    console.log("Connecté à la base de données 'socra'");

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });

    app.get('/', function (req, res) {
        db.collection("personnages").find().toArray(function (error, results) {
            if (error) throw error;

            res.send(results);
        });
    });  
});

// Require the dependencies
let mongoose = require("mongoose");
let TaskModel = require("../models/task-model");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../test.js');
let should = chai.should();
const fs = require('fs');

chai.use(chaiHttp);

describe('GET PDF Endpoint Tests', () => {
    beforeEach((done) => { // Before each test we empty the database
        TaskModel.deleteMany({}, (err) => {
            done();
        });
    });

    describe('GET pdf by id', () => {
        
        it('Should GET the pdf by id', done => {
            let task = new TaskModel({
                location: "Issy-les-Moulineaux",
                duration: 12,
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
                timestamp: Date.now()
            })
            task.save((err, task) => {
                chai.request(server)
                    .get('/pdf/' + task.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.headers['content-type'].should.be.eq('application/pdf');
                        fs.unlinkSync('./taskInfo.pdf');
                        done();
                    });
            });
        });

        it('Should send error 400: Mongoose invalid ID', done => {
            let task = new TaskModel({
                location: "Issy-les-Moulineaux",
                duration: 12,
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
                timestamp: Date.now()
            })
            const id = "fauxMongooseID";
            task.save((err, task) => {
                    chai.request(server)
                .get('/pdf/' + id)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.eql("The provided ID: " + id + " is not a valid mongoose ID") //check error message from response
                    res.body.should.have.property('error');
                    done();
                });
            });    
        });

        it('Should send error 404: Ressource not found because id does not exist', done => {
            let task = new TaskModel({
                location: "Issy-les-Moulineaux",
                duration: 12,
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
                timestamp: Date.now()
            })
            task.save((err, task) => {
                    chai.request(server)
                .get('/pdf/' + task.id.slice(0, -3) + '123')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.error.should.be.eql("Ressource not found, please verify that the ID: " + task.id.slice(0, -3) + '123' + " exists") //check error message from response
                    res.body.should.have.property('error');
                    done();
                });
            });    
        });
    });
});
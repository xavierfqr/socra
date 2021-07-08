// Require the dependencies
const mongoose = require("mongoose");
const TaskModel = require("../models/task-model");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();

chai.use(chaiHttp);


describe('POST Endpoint Tests', () => {
    beforeEach((done) => { // Before each test we empty the database
        TaskModel.deleteMany({}, (err) => {
            done();
        });
    });
    describe('POST one task', () => {
        it('Should POST a task', (done) => {
            let task = {
                location: "Issy-les-Moulineaux",
                duration: 12,
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
            }
            chai.request(server)
                .post('/task')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('location');
                    res.body.should.have.property('duration');
                    res.body.should.have.property('remote');
                    res.body.should.have.property('start');
                    res.body.should.have.property('job');
                    res.body.should.have.property('context');
                    res.body.should.have.property('mission');
                    res.body.should.have.property('timestamp');
                done();
            });
        });
    });

    // Test: Post one task with fail (error 400) because of an invalid task field
    describe('POST one task fail', () => {
        it('Should not POST a task with one wrong field', (done) => {
            let task = {
                location: "Issy-les-Moulineaux",
                duration: -12,  //'duration' field should NOT be negative
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
                timestamp: "Pas une date"
            }
            chai.request(server)
                .post('/task')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.eql('Bad request, some fields are not well formatted. Please read the documentation.') //check error message from response
                    res.body.should.have.property('error');
                    res.body.should.have.property('fields');
                    res.body.should.have.property('messages');
                done();
            });
        });
    });

    // Test: Post one task with fail (error 400) because of several invalid task fields
    describe('POST one task fail', () => {
        it('Should not POST a task with multiple wrong fields', (done) => {
            let task = {
                location: "Issy-les-Moulineaux",
                duration: -12,  //'duration' field should NOT be negative
                remote: -100,   //'remote' field should NOT be negative
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
                timestamp: "Pas une date"
            }
            chai.request(server)
                .post('/task')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.eql('Bad request, some fields are not well formatted. Please read the documentation.') //check error message from response
                    res.body.should.have.property('error');
                    res.body.should.have.property('fields');
                    res.body.should.have.property('messages');
                    res.body.fields.length.should.be.above(1);  //check if there are more than one field wrong
                done();
            });
        });
    });
});
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dependencies
let mongoose = require("mongoose");
let TaskModel = require("../models/task-model");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);


describe('Post Endpoint Tests', () => {
    beforeEach((done) => { // Before each test we empty the database
        TaskModel.remove({}, (err) => {
            done();
        });
    });
    describe('Post one task', () => {
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
});
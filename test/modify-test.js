// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dependencies
let mongoose = require("mongoose");
let TaskModel = require("../models/task-model");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

describe('PATCH Endpoint Tests', () => {
    beforeEach((done) => { // Before each test we empty the database
        TaskModel.remove({}, (err) => {
            done();
        });
    });

    describe('/PATCH one task', () => {
        it('Should PATCH one task', (done) => {

            // Create a task and save it in database
            const task = new TaskModel({
                location: "Issy-les-Moulineaux",
                duration: 12,
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
                timestamp: Date.now()
            });
            task.save();

            // data to patch
            const body = { remote: 50 };

            chai.request(server)
                .patch('/tasks/modify/' + task.id)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200); // Status code
                    res.body.should.have.property('remote').eql(50);
                done();
            });
        });
    });
});
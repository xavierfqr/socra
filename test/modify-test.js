// Require the dependencies
const mongoose = require("mongoose");
const TaskModel = require("../models/task-model");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();

describe('PATCH Endpoint Tests', () => {
    beforeEach((done) => { // Before each test we empty the database
        TaskModel.deleteMany({}, (err) => {
            done();
        });
    });

    describe('PATCH one task', () => {
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

    describe('PATCH one task width unknown id', () => {
        it('Should not PATCH one task with unknown id', (done) => {

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
            task.save((err, task) => {
                const id = task._id;

                const toDelete = TaskModel.find({ _id: id });
                toDelete.deleteMany((err, task) => {
                    // data to patch
                    const body = { remote: 50 };
                        
                    chai.request(server)
                        .patch('/tasks/modify/' + id)
                        .send(body)
                        .end((err, res) => {
                            res.should.have.status(404); // Status code
                        done();
                    });
                });
            });
        });
    });

    describe('PATCH one task with validation error', () => {
        it('Should not PATCH one task with incorrect field', (done) => {

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
            const body = { remote: 200 };

            chai.request(server)
                .patch('/tasks/modify/' + task.id)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400); // Status code
                    res.body.should.be.a('object');
                    res.body.error.should.be.eql('Bad request, some fields are not well formatted. Please read the documentation.') //check error message from response
                    res.body.should.have.property('error');
                    res.body.should.have.property('fields');
                    res.body.should.have.property('messages');
                done();
            });
        });
    });
});
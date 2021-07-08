// Require the dependencies
const mongoose = require("mongoose");
const TaskModel = require("../models/task-model");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../test.js');
const should = chai.should();

chai.use(chaiHttp);

describe('Acceptance Tests', () => {
    beforeEach((done) => { // Before each test we empty the database
        TaskModel.deleteMany({}, (err) => {
            done();
        });
    });

    describe('Common Use Cases', () => {
        it('POST and GET', done => {
            //GIVEN a task
            let task = {
                location: "Issy-les-Moulineaux",
                duration: 12,
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
            }
            //WHEN we make a post with the task 
            chai.request(server)
                .post('/task')
                .send(task)
                .then(res => { //THEN we can retrieve the task with a get request 
                    chai.request(server)
                    .get('/tasks')
                    .end((err, res) => {
                        res.should.have.status(200); // Status code
                        res.body.should.be.a('array'); // []
                        res.body.length.should.be.eql(1);
                        res.body[0].should.have.property('location').eql(task.location);
                        res.body[0].should.have.property('duration').eql(task.duration);
                        res.body[0].should.have.property('remote').eql(task.remote);
                        res.body[0].should.have.property('start').eql(task.start);
                        res.body[0].should.have.property('job').eql(task.job);
                        res.body[0].should.have.property('context').eql(task.context);
                        res.body[0].should.have.property('mission').eql(task.mission);
                    done();
                });
            });
        });

        it('POST, PATCH and GET by Id', done => {
            //GIVEN a task
            let task = {
                location: "Issy-les-Moulineaux",
                duration: 12,
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
            }
            //WHEN we make a post with the task 
            chai.request(server)
                .post('/task')
                .send(task)
                .then(res => { //WHEN we make an update on the remote field of the task
                    const taskId = res.body._id;
                    const newRemote = 50;
                    chai.request(server)
                        .patch('/tasks/modify/' + taskId)
                        .send({ remote: newRemote })
                        .then(res => { //THEN we can retrieve the task with a get request 
                            chai.request(server)
                                .get('/tasks/' + taskId)
                                .end((err, res) => {
                                    res.should.have.status(200); // Status code
                                    res.body.should.be.a('object'); // []
                                    res.body.should.have.property('location').eql(task.location);
                                    res.body.should.have.property('duration').eql(task.duration);
                                    res.body.should.have.property('remote').eql(newRemote);
                                    res.body.should.have.property('start').eql(task.start);
                                    res.body.should.have.property('job').eql(task.job);
                                    res.body.should.have.property('context').eql(task.context);
                                    res.body.should.have.property('mission').eql(task.mission);
                                done();
                        });
                });
            });
        });
    });
});
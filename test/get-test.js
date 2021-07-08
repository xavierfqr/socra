// Require the dependencies
const mongoose = require("mongoose");
const TaskModel = require("../models/task-model");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../test.js');
const should = chai.should();

chai.use(chaiHttp);

describe('GET Endpoint Tests', () => {
    beforeEach((done) => { // Before each test we empty the database
        TaskModel.deleteMany({}, (err) => {
            done();
        });
    });

    // Test: GET all the tasks
    describe('GET Empty', () => {
        it('Should GET no tasks', (done) => {
            chai.request(server)
                .get('/tasks')
                .end((err, res) => {
                    res.should.have.status(200); // Status code
                    res.body.should.be.a('array'); // []
                    res.body.length.should.be.eql(0); // no task
                done();
            });
        });
    });

    // Test: GET one task
    describe('GET tasks', () => {
        it('Should GET one task', (done) => {
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
            task.save((err, task) => { //manually set a task in the db
                chai.request(server)
                    .get('/tasks')
                    .end((err, res) => {
                        res.should.have.status(200); // Status code
                        res.body.should.be.a('array'); 
                        res.body.length.should.be.eql(1); 
                        res.body[0].should.have.property('location').eql(task.location);
                        res.body[0].should.have.property('duration').eql(task.duration);
                        res.body[0].should.have.property('remote').eql(task.remote);
                        res.body[0].should.have.property('start').eql(task.start);
                        res.body[0].should.have.property('job').eql(task.job);
                        res.body[0].should.have.property('context').eql(task.context);
                        res.body[0].should.have.property('mission').eql(task.mission);
                        res.body[0].should.have.property('timestamp').eql(task.timestamp);
                        res.body[0].should.have.property('_id').eql(task.id);
                    done();
                });
            });
        });

        it('Should GET two task', (done) => {
            const task1 = new TaskModel({
                location: "Issy-les-Moulineaux",
                duration: 12,
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
                timestamp: 1625756947333 // set timestamp in order to avoid same timestamp value for both tasks
            });

            const task2 = new TaskModel({
                location: "Paris 4",
                duration: 12,
                remote: 80,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
                timestamp: 1625756947331 // set timestamp in order to avoid same timestamp value for both tasks
            });
                
            task1.save((err, task1) => { //manually set a task in the db
                task2.save((err, task2) => {
                    chai.request(server)
                        .get('/tasks')
                        .end((err, res) => {
                            res.should.have.status(200); // Status code
                            res.body.should.be.a('array'); 
                            res.body.length.should.be.eql(2); 
                            res.body[0].should.have.property('location').eql(task1.location);
                            res.body[0].should.have.property('duration').eql(task1.duration);
                            res.body[0].should.have.property('remote').eql(task1.remote);
                            res.body[0].should.have.property('start').eql(task1.start);
                            res.body[0].should.have.property('job').eql(task1.job);
                            res.body[0].should.have.property('context').eql(task1.context);
                            res.body[0].should.have.property('mission').eql(task1.mission);
                            res.body[0].should.have.property('timestamp').eql(task1.timestamp);
                            res.body[0].should.have.property('_id').eql(task1.id);
                            
                            res.body[1].should.have.property('location').eql(task2.location);
                            res.body[1].should.have.property('duration').eql(task2.duration);
                            res.body[1].should.have.property('remote').eql(task2.remote);
                            res.body[1].should.have.property('start').eql(task2.start);
                            res.body[1].should.have.property('job').eql(task2.job);
                            res.body[1].should.have.property('context').eql(task2.context);
                            res.body[1].should.have.property('mission').eql(task2.mission);
                            res.body[1].should.have.property('timestamp').eql(task2.timestamp);
                            res.body[1].should.have.property('_id').eql(task2.id);
                        done();
                    });
                });
            });
        });
    });

    describe('GET task by id', () => {
        it('Should GET one task by Id', done => {
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
                .get('/tasks/' + task.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                        res.body.should.have.property('location').eql(task.location);
                    res.body.should.have.property('duration').eql(task.duration);
                    res.body.should.have.property('remote').eql(task.remote);
                    res.body.should.have.property('start').eql(task.start);
                    res.body.should.have.property('job').eql(task.job);
                    res.body.should.have.property('context').eql(task.context);
                    res.body.should.have.property('mission').eql(task.mission);
                    res.body.should.have.property('timestamp').eql(task.timestamp);
                    res.body.should.have.property('_id').eql(task.id);
                    done();
                })
            })    
        })

        it('Should send 400 error: mongoose id not valid', done => {
            let task = new TaskModel({
                location: "Issy-les-Moulineaux",
                duration: 12,
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
                timestamp: Date.now()
            });
            const id = "fauxMongooseID";
            task.save((err, task) => {
                    chai.request(server)
                .get('/tasks/' + id )
                .send(task)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.eql("The provided ID: " + id + " is not a valid mongoose ID") //check error message from response
                    res.body.should.have.property('error');
                    done();
                })
            })    
        })


        it('Should send 404 error: id does not match any task', done => {
            let task = new TaskModel({
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
                    chai.request(server)
                .get('/tasks/' + task.id.slice(0, -3) + '133' )
                .send(task)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.error.should.be.eql("Ressource not found, please verify that the ID: " + task.id.slice(0, -3) + '133' + " exists") //check error message from response
                    res.body.should.have.property('error');
                    done();
                })
            })    
        })

    });
});
// Require the dependencies
let mongoose = require("mongoose");
let TaskModel = require("../models/task-model");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

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
    describe('GET one task', () => {
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
                        res.body.should.be.a('array'); // []
                        res.body.length.should.be.eql(1); // no task
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
                .send(task)
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
    });
});
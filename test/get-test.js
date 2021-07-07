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

describe('Get Endpoint Tests', () => {
    beforeEach((done) => { // Before each test we empty the database
        TaskModel.remove({}, (err) => {
            done();
        });
    });

    // Test: GET all the tasks
    describe('Get Empty', () => {
        it('Should Get no tasks', (done) => {
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

<<<<<<< HEAD
=======
    describe('/GET task by id', () => {
        it('Should GET one task by Id', done => {
            let task = new TaskModel({
                location: "Issy-les-Moulineaux",
                duration: 12,
                remote: 100,
                start: "ASAP",
                job: "développeur ReactJs",
                context: "intégration au sein de l’équipe Engineering du pôle Industrialisation, Cloud and Data, le consultant contribuera aux activités APIs et API Management",
                mission: "Participer aux Comités d’Architecture pour garantir la bonne conformité des bonne pratique des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)",
            })
            task.save((err, task) => {
                    chai.request(server)
                .get('/tasks/' + task.id)
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
                        res.body.should.have.property('_id').eql(task.id);
                    done();
                })
            })    
        })
    });

>>>>>>> 929857088536e530f2f2f4071c8f92b6c07616cb
    // Test: GET one task
    describe('Get one task', () => {
        it('Should Get one task', (done) => {
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
            task.save(); //manually set a task in the db

            chai.request(server)
                .get('/tasks')
                .end((err, res) => {
                    res.should.have.status(200); // Status code
                    res.body.should.be.a('array'); // []
                    res.body.length.should.be.eql(1); // no task
                    res.body[0].should.have.property('location');
                    res.body[0]['location'].should.be.eql(task.location);
                done();
            });
        });
    });
});
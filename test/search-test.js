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

describe('SEARCH Endpoint Tests', () => {
    beforeEach((done) => { // Before each test we empty the database
        TaskModel.deleteMany({}, (err) => {
            done();
        });
    });

    describe('SEARCH by occurences', () => {
        it('Should order the 3 tasks', (done) => {
            const task1 = new TaskModel({
                location: "A",
                job: "dev",
                context: "foobarbazfoo",
                mission: "bazfoofoobar",
            });
            const task2 = new TaskModel({
                location: "B",
                job: "dev",
                context: "bazfoobarbaz",
                mission: "barbarfoobaz",
            });
            const task3 = new TaskModel({
                location: "C",
                job: "dev",
                context: "foobarbazbar",
                mission: "barfoobarfoo",
            });
            task1.save((err, task1) => { //manually set a task in the db
                task2.save((err, task2) => {
                    task3.save((err, task3) => {
                        chai.request(server)
                            .get('/tasks/search/keywords?search=foo,bar')
                            .end((err, res) => {
                                res.should.have.status(200); // Status code
                                res.body.should.be.a('array'); // []
                                res.body.length.should.be.eql(3);
                                res.body[0]['location'].should.be.eql(task3.location);
                                res.body[1]['location'].should.be.eql(task1.location);
                                res.body[2]['location'].should.be.eql(task2.location);
                                done();
                            });
                    });
                });
            });
        });
    });

    describe('SEARCH by word found', () => {
        it('Should order the 2 tasks', (done) => {
            const task1 = new TaskModel({
                location: "A",
                job: "dev",
                context: "foofoofoofoofoo",
                mission: "barbarbarbarbar",
            });
            const task2 = new TaskModel({
                location: "B",
                job: "dev",
                context: "foofoobazbazbarbar",
                mission: "barbazfoo",
            });
            task1.save((err, task1) => { //manually set a task in the db
                task2.save((err, task2) => {
                    chai.request(server)
                        .get('/tasks/search/keywords?search=foo,bar,baz')
                        .end((err, res) => {
                            res.should.have.status(200); // Status code
                            res.body.should.be.a('array'); // []
                            res.body.length.should.be.eql(2);
                            res.body[0]['location'].should.be.eql(task2.location);
                            res.body[1]['location'].should.be.eql(task1.location);
                            done();
                        });
                });
            });
        });
    });
});
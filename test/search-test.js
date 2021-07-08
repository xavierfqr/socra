// Require the dependencies
const mongoose = require("mongoose");
const TaskModel = require("../models/task-model");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();

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
                                res.body[0].should.have.property('location').eql(task3.location);
                                res.body[1].should.have.property('location').eql(task1.location);
                                res.body[2].should.have.property('location').eql(task2.location);
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
                            res.body[0].should.have.property('location').eql(task2.location);
                            res.body[1].should.have.property('location').eql(task1.location);
                            done();
                        });
                });
            });
        });
    });
});
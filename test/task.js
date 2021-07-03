// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dependencies
let mongoose = require("mongoose");
let TaskModel = require("../models/taskModel");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Tasks', () => {
    beforeEach((done) => { // Before each test we empty the database
        TaskModel.remove({}, (err) => {
           done();
        });
    });

    // Test: GET all the tasks
    describe('/GET task', () => {
        it('Should GET all the tasks', (done) => {
            chai.request(server)
                .get('/task')
                .end((err, res) => {
                    res.should.have.status(200); // Status code
                    res.body.should.be.a('array'); // []
                    res.body.length.should.be.eql(0); // no task
                done();
            });
        });
    });
});
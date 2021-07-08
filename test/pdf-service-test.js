// Require the dependencies
const mongoose = require("mongoose");
const TaskModel = require("../../models/task-model");
const server = require('../../app.js');
const chai = require('chai');
const should = chai.should();
const {formatDescription, unused} = require("../../services/pdf-service");

describe('PDF Unit Tests', () => {
    describe('formatDescription function tests', () => {
        it('duration', (done) => {
           const res = formatDescription("duration", 3);
           res.should.be.eql("3 month(s)")
           done()
        }); 

        it('price', (done) => {
            const res = formatDescription("price", 2);
            res.should.be.eql("2 euros")
            done()
        }); 

        it('remote', (done) => {
            const res = formatDescription("remote", 4);
            res.should.be.eql("4%")
            done()
        }); 

        it('default', (done) => {
            const res = formatDescription("LOVE SOCRA", 0);
            res.should.be.eql(0)
            done()
        }); 
    });
});

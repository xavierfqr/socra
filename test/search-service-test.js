// Require the dependencies
const mongoose = require("mongoose");
const TaskModel = require("../models/task-model");
const server = require('../app.js');
const chai = require('chai');
const should = chai.should();
const orderTasksByKeywords = require("../services/search-service");

describe('Search service Unit Tests', () => {
    describe('Order by occurences', () => {
        it('Should order the 3 tasks', (done) => {
            const taskList = [
                new TaskModel({
                    location: "A",
                    job: "dev",
                    context: "foobarbazfoo",
                    mission: "bazfoofoobar",
                }),
                new TaskModel({
                    location: "B",
                    job: "dev",
                    context: "bazfoobarbaz",
                    mission: "barbarfoobaz",
                }),
                new TaskModel({
                    location: "C",
                    job: "dev",
                    context: "foobarbazbar",
                    mission: "barfoobarfoo",
                })
            ];
            const res = orderTasksByKeywords(taskList, ["foo", "bar"]);
            res.should.be.a('array'); // []
            res.length.should.be.eql(3);
            res[0].should.have.property('location').eql(taskList[2].location);
            res[1].should.have.property('location').eql(taskList[0].location);
            res[2].should.have.property('location').eql(taskList[1].location);
            done();
        });
    });

    describe('Order by word found', () => {
        it('Should order the 2 tasks', (done) => {
            const taskList = [
                new TaskModel({
                    location: "A",
                    job: "dev",
                    context: "foofoofoofoofoo",
                    mission: "barbarbarbarbar",
                }),
                new TaskModel({
                    location: "B",
                    job: "dev",
                    context: "foofoobazbazbarbar",
                    mission: "barbazfoo",
                })
            ];
            const res = orderTasksByKeywords(taskList, ["foo", "bar", "baz"]);
            res.should.be.a('array'); // []
            res.length.should.be.eql(2);
            res[0].should.have.property('location').eql(taskList[1].location);
            res[1].should.have.property('location').eql(taskList[0].location);
            done();
        });
    });
});
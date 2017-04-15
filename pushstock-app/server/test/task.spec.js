const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../server');
const Task = require('../app/models/task');
const Button = require('../app/models/button');
const Employee = require('../app/models/employee');

chai.use(chaiHttp);

// Parent block
describe('Tasks', function() {
    const API_URL = "http://localhost:4200/api";
    const BTN_MAC_ADDR = '12345';
    const EMP_EMAIL = 'test@test.com';

    // function performed before all the tests
    before(function(done) {
        // create a button
        var button = new Button({ macAddr: BTN_MAC_ADDR, isActive: true });
        button.save();
        // create an employee
        var emp = new Employee();
        emp.email = EMP_EMAIL;
        emp.password = 'test';
        emp.profile.firstName = 'John';
        emp.profile.lastName = 'Smith';
        emp.role = 'Worker';
        emp.save();

        done();
    });

    // function performed after all the tests
    after(function(done) { // clean up db
        Task.remove({}, function(err) {
            Button.remove({}, function(err) {
                Employee.remove({}, function(err) {
                    done();
                });
            });
        });
    });

    // Test the GET /tasks route when there are no tasks
    describe('GET tasks when there are none', function() {
        it('should get empty list of tasks', function(done) {
            chai.request(API_URL).get('/tasks').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    // Test the GET /tasks route with one task
    
    // Test the POST /addTask with valid values
    describe('POST add new task with valid values', function() {
        it('should add task successfully', function(done) {
            // create body
            let task = { button_mac_addr: BTN_MAC_ADDR, employee_email: EMP_EMAIL };
            chai.request(API_URL)
            .post('/addTask')
            .send(task)
            .end((err, res) => {
                should.exist(err);
                res.should.not.have.status(200);
                done();
            });
        });
    });

    // Test the POST /addTask with unassigned button (should throw error)
    // Test the POST /addTask with isActive false button (added in web, should throw error)
    // Test the POST /addTask with isActive false employee (should throw error)
    // Test the POST /addTask with null values
    // Test the POST /addTask without all required params
    // Test the route /addTask with all REST methods but POST
});

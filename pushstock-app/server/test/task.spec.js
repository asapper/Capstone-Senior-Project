process.env['NODE_ENV'] = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../server');
const config = require('./config');
const Task = require('../app/models/task');
const Button = require('../app/models/button');
const Employee = require('../app/models/employee');

chai.use(chaiHttp);


// Parent block
describe('Tasks', function() {
    const API_URL = config.API_URL;
    const BTN_MAC_ADDR = '12345';
    const NEW_BTN_MAC_ADDR = '67890';
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

    // function performed after all the tests ran
    after(function(done) { // clean up db
        Task.remove({}, function(err) {
            Button.remove({}, function(err) {
                Employee.remove({}, function(err) {
                    server.close();
                    done();
                });
            });
        });
    });

    // function performed after each test
    afterEach(function(done) {
        Task.remove({}, function(err) {
            done();
        });
    });

    // Test the GET /tasks route
    describe('GET /tasks', function() {
        // get tasks when there are none
        it('should get empty list of tasks if there are no tasks', function(done) {
            chai.request(API_URL)
            .get('/tasks')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });

        // get tasks with only one in the db
        it('should get list with one task', function() {
            // create task
            Button.findOne({ macAddr: BTN_MAC_ADDR }, function(err, button) {
                Employee.findOne({ email: EMP_EMAIL }, function(err, employee) {
                    var newTask = new Task();
                    newTask.button = button._id;
                    newTask.employee = employee._id;
                    newTask.save();
                });
            })
            .then(function() {
                // get tasks
                chai.request(API_URL)
                .get('/tasks')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                });
            });
        });
    });

    // Test the route /tasks with non existing methods
    describe('POST /tasks', function() {
        it('should fail to reach POST /tasks', function(done) {
            chai.request(API_URL)
            .post('/tasks')
            .end(function(err, res) {
                should.exist(err);
                res.should.have.status(404);
                done();
            });
        });
    });

    // Test the route /tasks with non existing methods
    describe('PUT /tasks', function() {
        it('should fail to reach PUT /tasks', function(done) {
            chai.request(API_URL)
            .put('/tasks')
            .end(function(err, res) {
                should.exist(err);
                res.should.have.status(404);
                done();
            });
        });
    });

    // Test the route /tasks with DELETE method
    describe('DELETE /tasks', function() {
        it('should fail to reach DELETE /tasks');
        //it('should fail to reach DELETE /tasks', function(done) {
        //    chai.request(API_URL)
        //    .delete('/tasks')
        //    .end(function(err, res) {
        //        should.exist(err);
        //        res.should.have.status(404);
        //        done();
        //    });
        //});
    });

    // Test the POST /addTask
    describe('POST /addTask', function() {
        // pass all valid values
        it('should add task successfully with valid values', function(done) {
            // request body
            let task = { button_mac_addr: BTN_MAC_ADDR, employee_email: EMP_EMAIL };
            chai.request(API_URL)
            .post('/addTask')
            .send(task)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New task created!');
                done();
            });
        });

        // pass NULL mac address
        it('should fail to add task given null button MAC address', function(done) {
            // request body
            let task = { button_mac_addr: null, employee_email: EMP_EMAIL };
            chai.request(API_URL)
            .post('/addTask')
            .send(task)
            .end(function(err, res) {
                should.exist(err);
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Request with null required parameter(s).');
                done();
            });
        });

        // pass NULL employee email
        it('should fail to add task given null employee email', function(done) {
            // request body
            let task = { button_mac_addr: BTN_MAC_ADDR, employee_email: null };
            chai.request(API_URL)
            .post('/addTask')
            .send(task)
            .end(function(err, res) {
                should.exist(err);
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Request with null required parameter(s).');
                done();
            });
        });

        // pass no parameter for mac address
        it('should fail to add task given no button MAC address', function(done) {
            // request body
            let task = { employee_email: EMP_EMAIL };
            chai.request(API_URL)
            .post('/addTask')
            .send(task)
            .end(function(err, res) {
                should.exist(err);
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Request missing required parameter(s).');
                done();
            });
        });

        // pass no parameter for employee email
        it('should fail to add task given no employee email', function(done) {
            // request body
            let task = { button_mac_addr: BTN_MAC_ADDR };
            chai.request(API_URL)
            .post('/addTask')
            .send(task)
            .end(function(err, res) {
                should.exist(err);
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Request missing required parameter(s).');
                done();
            });
        });

        // Test with unassigned button (should throw error)
        it('should fail to add task if given button is unassigned', function(done) {
            // request body
            let data = { macAddr: NEW_BTN_MAC_ADDR };
            chai.request(API_URL).post('/singleClick').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201); // button created
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // attempt to add task to this button
                let task = { button_mac_addr: NEW_BTN_MAC_ADDR, employee_email: EMP_EMAIL };
                chai.request(API_URL).post('/addTask').send(task).end(function(err, res) {
                    should.exist(err);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('Button not active.');
                    // remove new button
                    Button.remove({ macAddr: NEW_BTN_MAC_ADDR }, function(err) {
                        done();
                    });
                });
            });
        });

        // Test with isActive false button (added in web, should throw error)
        it('should fail to add task if given button is not active', function(done) {
            // request body
            let data = { macAddr: NEW_BTN_MAC_ADDR, description: 'just testing...' };
            chai.request(API_URL).post('/addButton').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201); // button created
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // attempt to add task to this button
                let task = { button_mac_addr: NEW_BTN_MAC_ADDR, employee_email: EMP_EMAIL };
                chai.request(API_URL).post('/addTask').send(task).end(function(err, res) {
                    should.exist(err);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('Button not active.');
                    // remove new button
                    Button.remove({ macAddr: NEW_BTN_MAC_ADDR }, function(err) {
                        done();
                    });
                });
            });
        });

        // Test with isActive false employee (should throw error)
        it('should fail to add task if given employee is not active');

    });

    // Test the route /addTask with non-existing GET method
    describe('GET /addTask', function() {
        it('should fail to reach GET /addTask', function(done) {
            chai.request(API_URL)
            .get('/addTask')
            .end(function(err, res) {
                should.exist(err);
                res.should.have.status(404);
                done();
            });
        });
    });

    // Test the route /addTask with non-existing PUT method
    describe('PUT /addTask', function() {
        it('should fail to reach PUT /addTask', function(done) {
            chai.request(API_URL)
            .put('/addTask')
            .end(function(err, res) {
                should.exist(err);
                res.should.have.status(404);
                done();
            });
        });
    });

    // Test the route /addTask with non-existing DELETE method
    describe('DELETE /addTask', function() {
        it('should fail to reach DELETE /addTask', function(done) {
            chai.request(API_URL)
            .delete('/addTask')
            .end(function(err, res) {
                should.exist(err);
                res.should.have.status(404);
                done();
            });
        });
    });

    describe('adding a task through clicking of FLIC button', function() {
        // expected functionality
        it('should add task if button is active and has no tasks open', function(done) {
            // request body
            let data = { macAddr: BTN_MAC_ADDR };
            chai.request(API_URL).post('/singleClick').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('(No tasks ever) Task assigned to worker who has never been assigned a task.');
                done();
            });
        });

        // button added through single click
        it('should fail to add task if button is not configured', function(done) {
            // request body (new button)
            let data = { macAddr: NEW_BTN_MAC_ADDR };
            chai.request(API_URL).post('/singleClick').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // try to single click again, no task should be created
                chai.request(API_URL).post('/singleClick').send(data).end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Button has not been configured.');
                    // check number of tasks
                    chai.request(API_URL).get('/tasks').end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                    });
                    // remove new button
                    Button.remove({ macAddr: NEW_BTN_MAC_ADDR }, function(err) {
                        done();
                    });
                });
            });
        });

        // button added through web interface
        it('should fail to add task if button has been configured but is inactive', function(done) {
            // request body (new button)
            let data = { macAddr: NEW_BTN_MAC_ADDR, description: 'just testing...' };
            chai.request(API_URL).post('/addButton').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // try to single click, no task should be created
                chai.request(API_URL).post('/singleClick').send(data).end(function(err, res) {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Button has been activated!');
                    // check number of tasks
                    chai.request(API_URL).get('/tasks').end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                    });
                    // remove new button
                    Button.remove({ macAddr: NEW_BTN_MAC_ADDR }, function(err) {
                        done();
                    });
                });
            });
        });

        // create and activate button, create task, then single click should not create another task
        it('should fail to add task if button has an open task', function(done) {
            // request body
            let data = { macAddr: BTN_MAC_ADDR };
            chai.request(API_URL).post('/singleClick').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('(No tasks ever) Task assigned to worker who has never been assigned a task.');
                // verify number of tasks
                chai.request(API_URL).get('/tasks').end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    // try to single click again, no task should be created
                    chai.request(API_URL).post('/singleClick').send(data).end(function(err, res) {
                        should.not.exist(err);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Task not created, open task already exists.');
                        // verify number of tasks
                        chai.request(API_URL).get('/tasks').end(function(err, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(1);
                            done();
                        });
                    });
                });
            });
        });

        it('should assign task to admin if there are no workers');
        it('should assign task to first created worker if there are no tasks ever created');
        it('should assign task to worker with no open tasks');
    });

    // Test the GET /unassignedbuttons route
    describe('GET /unassignedbuttons', function() {
        // expected functionality
        it('should get list if button added through clicking FLIC button', function(done) {
            chai.request(API_URL).get('/unassignedbuttons').end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                // single click
                let data = { macAddr: NEW_BTN_MAC_ADDR }; // request body
                chai.request(API_URL).post('/singleClick').send(data).end(function(err, res) {
                    should.not.exist(err);
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('New button created!');
                    // get all unassigned buttons
                    chai.request(API_URL).get('/unassignedbuttons').end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(1);
                        // remove new button
                        Button.remove({ macAddr: NEW_BTN_MAC_ADDR }, function(err) {
                            done();
                        });
                    });
                });
            });
        });

        // return no unassigned buttons if no buttons exist
        it('should get empty list if no buttons', function(done) {
            chai.request(API_URL).get('/unassignedbuttons').end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });

        // return no unassigned buttons if only buttons were added through web
        it('should get empty list if button added through web interface', function(done) {
            // request body (new button)
            let data = { macAddr: NEW_BTN_MAC_ADDR, description: 'just testing...' };
            chai.request(API_URL).post('/addButton').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // get unassigned buttons
                chai.request(API_URL).get('/unassignedbuttons').end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    // remove new button
                    Button.remove({ macAddr: NEW_BTN_MAC_ADDR }, function(err) {
                        done();
                    });
                });
            });
        });
    });

    // Test the GET /assignedbuttons route
    describe('GET /assignedbuttons', function() {
        it('should get empty list if no buttons');
        it('should get list if button is configured through FLIC click first');
        it('should get list if button is configured thorugh web interface first');
        it('should get empty list if new FLIC button clicked');
        it('should get empty list if new button added through web interface');
    });

});

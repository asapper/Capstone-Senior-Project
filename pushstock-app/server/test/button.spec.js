process.env['NODE_ENV'] = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../server');
const config = require('./config');
const Button = require('../app/models/button');
const Employee = require('../app/models/employee');
const Task = require('../app/models/task');

chai.use(chaiHttp);


// Parent block
describe('Buttons', function() {
    const API_URL = config.API_URL;
    const ACTIVE_BUTTONS_ROUTE = '/activebuttons';
    const ALL_BUTTONS_ROUTE = '/buttons';

    const TMP_MAC_ADDR_1 = '111';
    const TMP_MAC_ADDR_2 = '222';
    const EMP_EMAIL = 'test@test.com';

    // operation performed before any test is run
    before(function(done) {
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

    // remove all buttons created after each test
    afterEach(function(done) {
        Task.remove({}, function(err) {
            Button.remove({}, function(err) {
                done();
            });
        });
    });

    // Test the GET /buttons route
    describe('GET /buttons', function() {
        // get buttons when there are none
        it('should get empty list of buttons if there are no buttons', function(done) {
            chai.request(API_URL)
            .get(ALL_BUTTONS_ROUTE)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });

        // get buttons when there is only one on db
        it('should get list with one button', function(done) {
            // create button
            var newBtn = new Button();
            newBtn.macAddr = TMP_MAC_ADDR_1;
            newBtn.description = 'just testing...';
            newBtn.save();
            // request all buttons
            chai.request(API_URL)
            .get(ALL_BUTTONS_ROUTE)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
        });
    });

    // Test non-existing routes for /buttons
    describe('POST /buttons', function() {
        it('should fail to reach POST /buttons');
    });

    // Test non-existing routes for /buttons
    describe('PUT /buttons', function() {
        it('should fail to reach PUT /buttons');
    });

    // Test non-existing routes for /buttons
    describe('DELETE /buttons', function() {
        it('should fail to reach DELETE /buttons');
    });

    // Test the POST /addButton route
    describe('POST /addButton', function() {
        it('should fail to add button if no description is provided');
    });

    // Test the PUT /buttons/<macAddr> route
    describe('PUT /buttons/<macAddr>', function() {
        it('should fail to update button if empty string is given for description');
    });

    // Test the GET /activebuttons route
    describe('GET /activebuttons', function() {
        // get empty list if there are no buttons
        it('should get empty list of buttons if there are no buttons', function(done) {
            chai.request(API_URL)
            .get(ACTIVE_BUTTONS_ROUTE)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });

        // get empty list if there are no active buttons
        it('should get empty list of buttons if one button is only added through FLIC button click', function(done) {
            // create button through single click route
            // request body
            let data = { macAddr: TMP_MAC_ADDR_1 };
            chai.request(API_URL).post('/singleClick').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201); // button created
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // request all active buttons
                chai.request(API_URL)
                .get(ACTIVE_BUTTONS_ROUTE)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
            });
        });


        // get empty list if there are no active buttons
        it('should get empty list of buttons if one button is only added through web interface', function(done) {
            // create button through add button route (different mac address)
            // request body
            let data = { macAddr: TMP_MAC_ADDR_2, description: 'just testing...' };
            chai.request(API_URL).post('/addButton').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201); // button created
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // request all active buttons
                chai.request(API_URL)
                .get(ACTIVE_BUTTONS_ROUTE)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    // remove new button
                    Button.remove({ macAddr: TMP_MAC_ADDR_2 }, function(err) {
                        done();
                    });
                });
            });
        });

        // get empty list if all buttons have an open task
        it('should get empty list if all buttons have an open task', function(done) {
            // activate a button
            // create button through add button route
            let data = { macAddr: TMP_MAC_ADDR_1, description: 'just testing...' }; // request body
            chai.request(API_URL).post('/addButton').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201); // button created
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // activate button through single click route
                let click_data = { macAddr: TMP_MAC_ADDR_1 };
                chai.request(API_URL).post('/singleClick').send(click_data).end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Button has been activated!');
                    // create task with active button
                    let task_data = { button_mac_addr: TMP_MAC_ADDR_1, employee_email: EMP_EMAIL };
                    chai.request(API_URL).post('/addTask').send(task_data).end(function(err, res) {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('New task created!');
                        // ensure no buttons are returned for active buttons route
                        chai.request(API_URL).get(ACTIVE_BUTTONS_ROUTE).end(function(err, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(0);
                            done();
                        });
                    });
                });
            });
        });

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
                let data = { macAddr: TMP_MAC_ADDR_2 }; // request body
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
                        Button.remove({ macAddr: TMP_MAC_ADDR_2 }, function(err) {
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
            let data = { macAddr: TMP_MAC_ADDR_2, description: 'just testing...' };
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
                    Button.remove({ macAddr: TMP_MAC_ADDR_2 }, function(err) {
                        done();
                    });
                });
            });
        });
    });

    // Test the GET /assignedbuttons route
    describe('GET /assignedbuttons', function() {
        // return no unassigned buttons if no buttons exist
        it('should get empty list if no buttons', function(done) {
            chai.request(API_URL).get('/assignedbuttons').end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });

        // button added through web interface AND clicked (throguh single click route)
        it('should get list if button is configured thorugh web interface first', function(done) {
            // create button through add button route
            let data = { macAddr: TMP_MAC_ADDR_1, description: 'just testing...' }; // request body
            chai.request(API_URL).post('/addButton').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201); // button created
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // click that button
                let click_data = { macAddr: TMP_MAC_ADDR_1 };
                chai.request(API_URL).post('/singleClick').send(click_data).end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Button has been activated!');
                    // check number of assigned buttons
                    chai.request(API_URL).get('/assignedbuttons').end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(1);
                        // remove new button
                        Button.remove({ macAddr: TMP_MAC_ADDR_1 }, function(err) {
                            done();
                        });
                    });
                });
            });
        });

        // button clicked AND then assigned through web interface
        it('should get list if button is configured through FLIC click first', function(done) {
            // click button
            let click_data = { macAddr: TMP_MAC_ADDR_1 };
            chai.request(API_URL).post('/singleClick').send(click_data).end(function(err, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // assign button through web interface
                let data = { macAddr: TMP_MAC_ADDR_1, description: 'testing...' };
                chai.request(API_URL).put('/assignbutton').send(data).end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Button has been assigned!');
                    // check number of assigned buttons
                    chai.request(API_URL).get('/assignedbuttons').end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(1);
                        // remove new button
                        Button.remove({ macAddr: TMP_MAC_ADDR_1 }, function(err) {
                            done();
                        });
                    });
                });
            });
        });

        // button only clicked and never assigned in web interface
        it('should get empty list if new FLIC button clicked', function(done) {
            // click button
            let click_data = { macAddr: TMP_MAC_ADDR_1 };
            chai.request(API_URL).post('/singleClick').send(click_data).end(function(err, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // check number of assigned buttons
                chai.request(API_URL).get('/assignedbuttons').end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    // remove new button
                    Button.remove({ macAddr: TMP_MAC_ADDR_1 }, function(err) {
                        done();
                    });
                });
            });
        });

        // button created in web interface and never clicked
        it('should get empty list if new button added through web interface', function(done) {
            // create button through add button route
            let data = { macAddr: TMP_MAC_ADDR_1, description: 'just testing...' }; // request body
            chai.request(API_URL).post('/addButton').send(data).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(201); // button created
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New button created!');
                // check number of assigned buttons
                chai.request(API_URL).get('/assignedbuttons').end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    // remove new button
                    Button.remove({ macAddr: TMP_MAC_ADDR_1 }, function(err) {
                        done();
                    });
                });
            });
        });
    });

    // Test the PUT /assignbutton route
    describe('PUT /assignbutton', function() {
        it('should throw error if no mac address parameter is given');
        it('should fail to assign button if no description is given');
        it('should fail to assign button if empty string is given for description');
        it('should throw error if you try to assign non-existent button');
        it('should thorw error if you try to assign a button that was added through web interface');
        it('should fail to assign button already assigned');
    });

    // Test the PUT /unassignbutton route
    describe('PUT /unassignbutton', function() {
        it('should fail to unassign a button that does not exist');
        it('should fail to unassign a button that was only clicked and never assigned');
        it('should fail to unassign a button that was added through web and never clicked');
        it('should throw error if no mac address parameter is given');
        it('should fail to unassign already unassigned button');
    });

});

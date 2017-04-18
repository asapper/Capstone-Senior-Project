process.env['NODE_ENV'] = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../server');
const config = require('./config');

chai.use(chaiHttp);


// Parent block
describe('Buttons', function() {
    const API_URL = config.API_URL;

    // Test the GET /buttons route
    //describe('GET /buttons', function() {
    //    // get buttons when there are none
    //    it('should get empty list of buttons if there are no buttons');

    //    // get buttons when there is only one on db
    //    it('should get list with one button');
    //});
});

const express = require('express');
const router = express.Router();
const authRouter = express.Router();
const AuthenticationController = require('../controllers/authentication'),  
      passportService = require('../config/passport'),
      passport = require('passport');

const Button = require('../app/models/button');
const Employee = require('../app/models/employee');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });  

// Constants for role types
const REQUIRE_ADMIN = "Admin",  
      REQUIRE_OWNER = "Owner",
      REQUIRE_CLIENT = "Client",
      REQUIRE_MEMBER = "Member";

//=========================
// Auth Routes
//=========================

// Set auth routes as subgroup/middleware to apiRoutes
router.use('/auth', authRouter);

authRouter.get('/', function(req, res) {
    console.log("GET: /api/auth being accessed");
    res.json({ message: 'Hooray! Welcome to Authentication!' });
});

// Registration route
authRouter.post('/register', AuthenticationController.register);

// Login route
authRouter.post('/login', requireLogin, AuthenticationController.login);

// Route always called (verifications done here)
router.use(function(req, res, next) {
    // logging
    console.log('Some authentiation (should be) happening here...');
    next(); // next route
});

// Main route (ex: /api/)
router.get('/', function(req, res) {
    console.log("GET: /api/ being accessed");
    res.json({ message: 'Hooray! Welcome to our API!' });
});

// Single click POST route (ex: /api/singleClick)
router.post('/singleClick', function(req, res) {
    // get the button's information
    buttonId = req.body.buttonid;
    clickTimestamp = req.body.click_timestamp;

    console.log("POST: Single Click by button " +
        buttonId + " at " + clickTimestamp);

    // validate button information
    // ...validation here

    // create new Button
    var newBtn = new Button();
    newBtn.buttonId = buttonId;
    newBtn.clickTimestamp = clickTimestamp;

    // save the Button and check for errors
    newBtn.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'New button created!' });
            console.log('New button created!');
        }
    });
});

// Retrieve all Buttons in database (ex: /api/buttons)
router.get('/buttons', function(req, res) {
    console.log("GET: Returning list of buttons...");

    // Find all buttons
    Button.find(function(err, buttons) {
        if (err) {
            res.send(err);
        } else {
            res.json(buttons);
            console.log('Returning a list of all the buttons in the database!');
        }
    });
});

module.exports = router;

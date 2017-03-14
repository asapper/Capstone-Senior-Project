const express = require('express');
const router = express.Router();

const Button = require('../app/models/button');


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

router.post('/addButton', function(req, res) {
    // get the button's information
    buttonId = req.body.buttonId;
    clickTimestamp = req.body.clickTimestamp;
    description = req.body.buttonDescription;
    console.log("POST: button added through webapp " +
        buttonId + " at " + clickTimestamp);

    // validate button information
    // ...validation here

    // create new Button
    var newBtn = new Button();
    newBtn.buttonId = buttonId;
    newBtn.clickTimestamp = clickTimestamp;
    newBtn.buttonDescription = description;
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

module.exports = router;

const express = require('express');
const router = express.Router();


// Route always called (verifications done here)
router.use(function(req, res, next) {
    // logging
    console.log('Some validation (should be) happening here!');
    next(); // next route
});

// Main route (ex: /api/)
router.get('/', function(req, res) {
    console.log("GET: /api/ being accessed")
    res.json({ message: 'Hooray! Welcome to our API!' });
});

// Single click POST route (ex: /api/singleClick)
router.post('/singleClick', function(req, res) {
    button_id = req.body.buttonid
    click_timestamp = req.body.click_timestamp
    console.log("POST: Single Click by button " +
        button_id + " at " + click_timestamp);
    res.json({ message: 'Single click acknowledged' });
});

module.exports = router;

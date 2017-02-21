const express = require('express');
const router = express.Router();

// Get API listing
router.get('/', (req, res) => {
    res.send('api works!');
});

module.exports = router;

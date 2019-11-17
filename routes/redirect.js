var express = require('express');
var router = express.Router();

var bdm = require('./redirects/bdm');
var cgm = require('./redirects/cgm');

// Set redirects for legacy plugins.
router.use('/business-directory', bdm );
router.use('/cgm', cgm );

module.exports = router;

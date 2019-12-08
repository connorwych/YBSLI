var express					= require('express');
var router					= express.Router();
var logger					= require(__rootpath + '/lib/logging/errorLogger');
var lookup					= require(__rootpath + '/lib/interpreterlookup/interpreterlookup');

/*
*	Interpreter Listing Service.
*	Creates and SQL query, submits to google
*	Returns JSON array of results
*/
router.get('/getListing', function(req, res) {

	/*
	* See if there is a cached version of the listing
	* If not try to retrieve it from google
	* and cache it
	*/
	nodeCache.get("interpreterList", function( err, value ) {
		if( !err && value !=  undefined ) {
			logger.debug("Response found in cache");
			// res.type('json');
			res.send(value);
			return;
		} else {
			logger.debug("File does not exist, requesting data");
			interpreterList = lookup.getAllInterpreters( function(value, error) {
				if (error == undefined) {
					logger.error("Succesffully retrived data, returning to client and cacheing");
					res.send(value);
					nodeCache.set("interpreterList", value, 600);
				} else {
					logger.error("Failed to retrieve interpreter data. Returning status 500");
					logger.error(error);
					res.status(500);
					res.send();
				}
			});
		}
	});
});

/*
*	Interpreter data service
*	Queries Google for full details on a single interpreter
*	Returns JSON array of data
*/
router.get('/getInterpreter', function(req, res) {

	logger = logger.child({method: "getInterpreter"});
	try{
		var ROWID = parseInt(req.headers.interpreterid);
	} catch (err) {
		logger.error("Could not parse interpreterID " + err);
		res.status(404);
		res.send();
		return;
	}
	var interpreterString = "interpreter-"+ROWID

	logger.debug("Valid interpreter, attempting to retireve data");
	nodeCache.get(interpreterString, function( err, value ) {
		if( !err && value !=  undefined ) {
			logger.debug("Response found in cache");
			res.type('json');
			res.send(value);
			return;
		} else {
			logger.debug("File does not exist, requesting data");
			interpreterList = lookup.getInterpreterByID(ROWID, function(value, error) {
				if (error == undefined) {
					logger.error("Succesffully retrived data, returning to client and cacheing");
					res.send(value);
					nodeCache.set(interpreterString, value, 600);
					return;
				} else {
					logger.error("Failed to retrieve interpreter data. Returning status 500");
					res.status(500);
					res.send();
					return;
				}
			});
		}
	});
});

module.exports = router;

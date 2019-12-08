var bunyan        = require('bunyan');
var fsr           = require('file-stream-rotator');
var logDirectory  = __rootpath + '/logs';

var errorLogStream = fsr.getStream({
	date_format: 'YYYYMMDD',
	filename: logDirectory + '/error-%DATE%.log',
	frequency: 'daily',
	verbose: false
});

var logger = bunyan.createLogger({
	name: 'ybsli',
	level: 'debug',
	streams: [{
		stream: errorLogStream,
	},{
		stream: process.stderr
	}]
});

module.exports = logger;

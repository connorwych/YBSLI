var morgan        = require('morgan');
var fsr           = require('file-stream-rotator');
var logDirectory  = __rootpath + '/logs';

var accessLogStream = fsr.getStream({
	date_format: 'YYYYMMDD',
	filename: logDirectory + '/access-%DATE%.log',
	frequency: 'daily',
	verbose: false
});

var accessLogger = morgan('combined', {
	stream: accessLogStream
});

module.exports = accessLogger;

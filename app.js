__rootpath = __dirname;

var express           = require('express');
var path              = require('path');
var favicon           = require('serve-favicon');
var cookieParser      = require('cookie-parser');
var bodyParser        = require('body-parser');

var routes            = require('./routes/index');
var redirect          = require('./routes/redirect')
var listing           = require('./routes/listing');
var sendemail         = require('./routes/sendemail');

var accessLogger      = require('./lib/logging/accessLogger');
var errorLogger       = require('./lib/logging/errorLogger');

const NodeCache = require( "node-cache" );
nodeCache = new NodeCache();

var app = express();

// Set up logging
app.use(accessLogger);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'cache')));

app.use('/', routes);
app.use('/', redirect)
app.use('/services', listing);
app.use('/services', sendemail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
//    message: err.message,
//    error: {}
  });
});


module.exports = app;

var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
process.env.PWD = process.cwd();
app.set('views', path.join(process.env.PWD, 'views'));
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 3000));

app.use(favicon(process.env.PWD + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use('/', routes);

app.use('/proxy', proxy('https://moskito-api.herokuapp.com', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

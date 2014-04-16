'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    passport = require('passport'),
    oauth2 = require('./lib/config/middlewares/oauth2');

var env = process.env.NODE_ENV || 'development'
    , config = require('./lib/config/config')[env]
var app = express();

// use to help debug "Can't set headers after they are sent" errors
//app.use(function(req, res, next) {
//  res.on('header', function() {
//    console.trace('HEADERS GOING TO BE WRITTEN');
//  });
//  next();
//});

// Connect to database
var db = require('./lib/db/mongo');

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Populate empty DB with dummy data
require('./lib/db/dummydata');

// Express Configuration
app.configure('development', function(){
  app.use(require('connect-livereload')());
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
  app.set('views', __dirname + '/app/views');
});

app.configure('production', function(){
  app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', __dirname + '/views');
});

app.configure(function(){
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

    app.use(passport.initialize());

  // Router needs to be last
	app.use(app.router);
});

// Controllers
var api = require('./lib/controllers/api'),
    users = require('./lib/controllers/users'),
    controllers = require('./lib/controllers');

var passportStrategies = require('./lib/config/passport')(passport, config);

// Server Routes
app.post('/oauth/token', oauth2.token);
app.get('/api/awesomeThings', api.awesomeThings);

app.put('/api/register', users.registerUser)

app.get('/api/secure',
    passport.authenticate('bearer', {session: false}),
        function(req, res) {
            // req.authInfo is set using the 'info' argument supplied by
            // 'BearerStrategy'.  It is typically used to indicate scope of the token,
            // and used in access control checks.  For illustrative purposes, this
            // example simply returns the scope in the response.
            res.json(req.user);
        });
//app.get('/api/secure', function(req, res) {
//  res.json({username: 'name'});
//});

// Angular Routes
app.get('/partials/*', controllers.partials);
app.get('/*', controllers.index);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
/**
 * Created by hafizbilalraza on 9/22/2014.
 */
/**
 * Module dependencies.
 */

var express = require('express'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose= require('mongoose');

/**
 * API keys and Passport configuration.
 */

var config = require('./config');

/**
 * Controllers
 */

var api = require('./controllers/api');

/**
 * Create Express server.
 */

var app = express();

/**
 * Connect to MongoDB.
 */

mongoose.connect(config.db);
mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
mongoose.connection.once('open', function(){
    console.log('mongodb Connected');
});

/**
 * Express configuration.
 */

app.set('port', config.port);

app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());



/**
 * 500 Error Handler.
 */

app.use(errorHandler());

/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
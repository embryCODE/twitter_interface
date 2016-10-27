'use strict';

/**
 * @file Portfolio Project 7 for Techdegree. Build a Twitter Interface.
 * {@link https://teamtreehouse.com/projects/build-a-twitter-interface}
 * @author Mason Embry <mason@embrycode.com>
 */

/**
 * Twitter interface module for Treehouse Techdegree.
 * @module app
 */



var express = require('express'),
  path = require('path'),
  twitter = require('./twitter'),
  bodyParser = require('body-parser');

var app = express();



/**
 * SERVER SETUP
 */
app.listen(3000, function() {
  console.log('Server running on port 3000.');
});
app.use(express.static(path.join(__dirname, 'public')));



/**
 * VIEWS SETUP
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



/**
 * ROUTING
 */

/**
 * Body parser to make request data easily usable.
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * Error handler.
 */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    err: err
  });
});

/**
 * Respond to a GET request at root by calling getTwitterData() and rendering
 * index template.
 */
app.get('/', function(req, res, next) {
  twitter.getTwitterData(req, res, next);
});

/**
 * Respond to a POST request at root by calling postTweet() and passing in
 * the data through the req object. This data has been parsed by bodyParser.
 */
app.post('/', function(req, res, next) {
  twitter.postTweet(req, res, next);
});

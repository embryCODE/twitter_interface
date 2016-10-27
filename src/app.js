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



/**
 * MODULES
 */

var express = require('express'),
  path = require('path'),
  createError = require('http-errors'),
  twitter = require('./twitter');

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

app.get('/', function(req, res, next) {
  twitter.getTwitterData(req, res, next);
});

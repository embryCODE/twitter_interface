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

var Twit = require('twit'),
  keys = require('./keys'),
  express = require('express'),
  path = require('path'),
  http = require('http'),
  createError = require('http-errors');



/**
 * TWITTER AUTHORIZATION
 */

/**
 * Create twit object.
 * @param {object} keys OAuth keys from separate file.
 */
var twit = new Twit(keys);

var app = express();



/**
 * SERVER SETUP
 */

app.listen(3000);
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
  res.render('index', {
    title: 'Twitter Client'
  });
});



/**
 * TWITTER APP
 */

// CODE GOES HERE

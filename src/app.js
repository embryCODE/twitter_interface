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
  config = require('./config'),
  express = require('express'),
  path = require('path'),
  http = require('http'),
  createError = require('http-errors');



/**
 * TWITTER AUTHORIZATION
 */

/**
 * Create twitter object.
 * @param {object} keys OAuth keys from separate file.
 */
var twitter = new Twit(config);

var app = express();



/**
 * SERVER SETUP
 */

app.listen(3000, function() {
	console.log("Server running on port 3000.");
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
  res.render('index', {
    title: 'Twitter Client',
    user: user,
    user_timeline: user_timeline,
    friends: friends,
    direct_messages: direct_messages,
    config: config
  });
});



/**
 * TWITTER APP
 */

var user,
    user_timeline,
    friends,
    direct_messages;

twitter.get('users/show', { screen_name: config.screen_name}, function(err, data, response) {
  user = data;
});

twitter.get('statuses/user_timeline', { screen_name: config.screen_name, count: 5 }, function(err, data, response) {
  user_timeline = data;
});

twitter.get('friends/list', { screen_name: config.screen_name, count: 5 }, function(err, data, response) {
  friends = data;
});

twitter.get('direct_messages/sent', { screen_name: config.screen_name, count: 5 }, function(err, data, response) {
  direct_messages = data;
});

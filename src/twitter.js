'use strict';

var Twit = require('twit'),
  config = require('./config'),
  createError = require('http-errors');



/**
 * TWITTER AUTHORIZATION
 */

/**
 * Create twitter object.
 * @param {object} keys OAuth keys from separate file.
 */
var twitter = new Twit(config);



/**
 * TWITTER API CALLS
 */

function getTwitterData(req, res, next) {
  twitter.get('users/show', {
      screen_name: config.screen_name
    },
    function(err, data, response) {
      if (!err) {
        var user = data;
        twitter.get('statuses/user_timeline', {
            screen_name: config.screen_name,
            count: 5
          },
          function(err, data, response) {
            if (!err) {
              var user_timeline = data;
              twitter.get('friends/list', {
                  screen_name: config.screen_name,
                  count: 5
                },
                function(err, data, response) {
                  if (!err) {
                    var friends = data;
                    twitter.get('direct_messages/sent', {
                        count: 5
                      },
                      function(err, data, response) {
                        if (!err) {
                          var direct_messages_sent = data;
                          twitter.get('direct_messages', {
                              count: 5
                            },
                            function(err, data, response) {
                              if (!err) {
                                var direct_messages_received = data;
                                var direct_messages_array = direct_messages_sent.concat(direct_messages_received);
                                direct_messages_array.sort(function(a, b) {
                                  return parseFloat(a.id) - parseFloat(b.id);
                                });
                                direct_messages_array.reverse();
                                direct_messages_array.splice(-5, 5);

                                res.render('index', {
                                  title: 'Twitter Client',
                                  user: user,
                                  user_timeline: user_timeline,
                                  friends: friends,
                                  direct_messages_array: direct_messages_array,
                                  config: config
                                });
                              } else {
                                handleError(err, req, res, next);
                              }
                            }
                          );
                        } else {
                          handleError(err, req, res, next);
                        }
                      }
                    );
                  } else {
                    handleError(err, req, res, next);
                  }
                }
              );
            } else {
              handleError(err, req, res, next);
            }
          }
        );
      } else {
        handleError(err, req, res, next);
      }
    }
  );
}

function postTweet(req, res, next) {
  twitter.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
    console.log(data);
  });
}

function handleError(err, req, res, next) {
  res.status(500);
  res.render('error', {err: err});
}



exports.getTwitterData = getTwitterData;
exports.postTweet = postTweet;

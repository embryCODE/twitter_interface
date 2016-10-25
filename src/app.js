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


var Twit = require('twit'),
  keys = require('./keys');

/**
 * Create twit object.
 * @param {object} keys OAuth keys from separate file.
 */
var twit = new Twit(keys);

'use strict';

var Twit = require('twit');
var keys = require('./keys');

var twit = new Twit(keys);

twit.post('statuses/destroy/:id', { id: '790928195377885185' }, function (err, data, response) {
  console.log(data);
});

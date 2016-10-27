(function() {
  'use strict';

  $('.app--tweet--timestamp, .app--message--timestamp').each(function() {
    var thisElementTime = new Date(this.innerHTML).toISOString();
    var timestamp = $.timeago(thisElementTime);
    this.innerHTML = timestamp;
  });

$('.app--tweet form').submit(function(e) {
  e.preventDefault();
  var postData = $('#tweet-textarea').val();
  $.post('/', {tweet: postData});
});

})();

(function() {
  'use strict';

  /**
   * Gets time from each message timestamp and replaces them with relative
   * timestamps from timeago plugin.
   */
  $('.app--tweet--timestamp, .app--message--timestamp').each(function() {
    var thisElementTime = new Date(this.innerHTML).toISOString();
    var timestamp = $.timeago(thisElementTime);
    this.innerHTML = timestamp;
  });

  /**
   * Updates the remaining character count on keyup.
   */
  $('.app--tweet form').keyup(function() {
    var currentChars = $('#tweet-textarea').val().length;
    var remainingChars = 140 - currentChars;
    $('#tweet-char').text(remainingChars);
    if ($('#tweet-char').text() < 0) {
      $('#tweet-char').css('color', 'red');
    } else {
      $('#tweet-char').css('color', '#ccc');
    }
  });

  /**
   * Submit button handler. Posts tweet to server using $.post.
   * Disabled if more than 140 characters.
   */
  $('.app--tweet form').submit(function(e) {
    e.preventDefault();
    var postData = $('#tweet-textarea').val();
    if (postData.length <= 140) {
      $.post('/', {
        tweet: postData
      }, function(cbData) {
        console.log(cbData);
        $('body').load('/');
      });
      $('#tweet-textarea').val('');
      $('#tweet-textarea').attr('placeholder', 'Posting...');
      setTimeout(function() {
        $('#tweet-textarea').attr('placeholder', 'What\'s happening?');
      }, 2000);
    }
  });

})();

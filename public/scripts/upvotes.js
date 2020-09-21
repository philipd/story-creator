$(document).ready(function() {
  const heart = $('#storyupvote');
  const counter = $('.upvotes');

  heart.on('click', function() {
    if (counter === '1') {
      counter = '0';
      heart.removeClass('red');;
    } else {
      counter = '1';
      heart.addClass('red');
    }
  });
});

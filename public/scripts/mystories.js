const sampleStories = {
  stories: [
    { userId: 1, title: 'Midnight\'s Children' },
    { userId: 1, title: 'The Crying of Lot 49' },
    { userId: 2, title: 'Oryx and Crake' }
  ]
};

const createStoryElement = function(storyData) {
  let $story = $('<article>').addClass('story');
  let $title = $('<div>').addClass('title').text(storyData.title);
  $story.append($title);
  return $story;
};

const renderStories = function(stories) {
  for (const story of stories) {
    let $story = createStoryElement(story);
    $('#stories').prepend($story);
  }
};

const loadStories = function() {
  // Get the current URL
  const url = $(location).attr('href');
  // Get the requested userid, if it exists
  const userid = Number(url.split('/').slice(-1)[0]);
  console.log(userid);
  if (!isNaN(userid)) {
    console.log('hi');
    // Get stories by userid
    $.ajax('../../api/stories/user/' + userid, { method: 'GET' })
      .then(function(response) {
        renderStories(response.story);
      });
  } else {
    // Get all stories
    $.ajax('../../api/stories', { method: 'GET' })
      .then(function(response) {
        renderStories(response.stories);
      });
  }

};

$(document).ready(() => {
  loadStories();
});

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

const renderStories = function(story) {
  let $story = createStoryElement(story);
  $('#stories').prepend($story);

};

const loadStories = function() {
  $.ajax('api/stories/' + 3, { method: 'GET' })
    .then(function(response) {
      renderStories(response.story);
    });
};

$(document).ready(() => {
  loadStories();
});

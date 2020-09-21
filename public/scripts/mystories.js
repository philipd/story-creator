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
  const authorid = $("#page-data").attr("data-authorid");

  $.ajax('../../api/stories/user/' + authorid, { method: 'GET' })
    .then(function(response) {
      console.log('Ajax response:', response);
      renderStories(response.stories);
    });
};

$(document).ready(() => {
  loadStories();
});

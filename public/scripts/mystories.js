const createStoryElement = function(storyData) {
  console.log(storyData)
  let $story = $('<article>').addClass('story');
  let $storyHeader = $(`
  <article class="storyheader">
    <p class="title"><a href="/stories/${storyData.id}">${storyData.title}</a></p>
  </article>`);
  let $text = $('<p>').addClass('storytext').text(storyData.text);
  $story.append($storyHeader, $text, );
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

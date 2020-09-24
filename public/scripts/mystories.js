const createStoryElement = function(storyData) {
  let $story = $('<article>').addClass('story');
  let $storyHeader = $(`
  <article class="storyheader">
    <p class="title"><a href="/stories/${storyData.id}">${storyData.title}</a></p>
  </article>`);
  let $text = $('<p>').addClass('storytext').text(storyData.text);
  $story.append($storyHeader, $text,);
  return $story;
};

const createUserElement = function(storyData) {
  console.log(storyData);
  const $userDiv = $('<div>').attr('id', 'user-info');
  const $userHandle = $('<div>').attr('id', 'user-handle').text(storyData.name);
  const $userAvatar = $('<img>').attr('src', storyData.avatar);
  $userDiv.append($userAvatar, $userHandle);
  return $userDiv;
};

const renderStories = function(stories) {
  for (const story of stories) {
    let $story = createStoryElement(story);
    $('#stories').prepend($story);
  }
  let $userInfo = createUserElement(stories[0]);
  $('#stories').prepend($userInfo);
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

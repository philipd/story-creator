const createStoryElement = function(storyData) {
  console.log(storyData)
  let $story = $('<article>').addClass('story');
  let $storyHeader = $(`
  <article class="storyheader">
    <div id="author">
    <span id="avatar"><img src=${storyData.avatar}></span>
    <span id="handle"><a href="/stories/user/${storyData.user_id}">${storyData.name}</a></span>
    </div>
    <p class="title"><a href="/stories/${storyData.story_id}">${storyData.title}</a></p>
    <div class="icons">
    </div>
  </article>`);
  let $text = $('<p>').addClass('storytext').text(storyData.text);
  let $footer;
  if (storyData.status === 'open') {
    $footer = $(`
    <footer class="footer">
        <span class="status">Open to Contributions ✍</span>
    </footer>`);
  } else if (storyData.status === 'closed') {
    $footer = $(`
    <footer class="footer">
        <span class="status">Currently Closed to Contributions</span>
    </footer>`);
  } else if (storyData.status === 'complete') {
    $footer = $(`
    <footer class="footer">
        <span class="status">A Complete Story! Have a Read 🤓!</span>
    </footer>`);
  }
  $story.append($storyHeader, $text, $footer);
  return $story;
};

// const createStoryElement = function(storyData) {
//   let $story = $('<article>').addClass('story');
//   let $title = $('<div>').addClass('title').text(storyData.title);
//   $story.append($title);
//   return $story;
// };

const renderStories = function(stories) {
  for (const story of stories) {
    let $story = createStoryElement(story);
    $('#stories').prepend($story);
  }
};

const loadStories = function() {
  $.ajax('../api/stories', { method: 'GET' })
    .then(function(response) {
      renderStories(response.stories);
    });
};

$(document).ready(() => {
  loadStories();
});

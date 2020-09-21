const createStoryElement = function(storyData) {
  console.log(storyData)
  let $story = $('<article>').addClass('story');
  let $storyHeader = $(`
  <article class="storyheader">
    <div id="author">
    <span id="avatar"><img src=${storyData.avatar}></span>
    <span id="handle">${storyData.name}</span>
    </div>
    <p class="title">${storyData.title}</p>
    <div class="icons">
      <i id="storyupvote" class="far fa-heart fa-xs"></i>
      <output class="upvotes">0</output>
    </div>
  </article>`);
  let $text = $('<p>').addClass('storytext').text(storyData.text);
  let $footer = $(`
    <footer class="footer">
      <div id="storybuttons">
        <button type="submit">End Story</button>
        <button type="button">Open for Contributions</button>
      </div>
    </footer>`);
  $story.append($storyHeader, $text, $footer);
  return $story;
};

const createContributionsContainer = function(storyData) {
  let output = (
    `<article class="contribution">
      <article class="contribution-header">
        <div id="contribution-author">
          <span id="contribution-avatar"><img src=${storyData.avatar}></span>
          <span id="contribution-handle">Username</span>
        </div>
        <p class="title">Part ${storyData.chapter_number}</p>
        <div class="icons">
          <i id="storyupvote" class="far fa-heart fa-xs"></i>
          <output class="upvotes">0</output>
        </div>
      </article>
      <p>${storyData.ctext}</p>
      <footer class="footer">
        <div class="contributionbuttons">
          <button type="button">Delete Contribution</button>
          <button type="button">Accept Contribution</button>
        </div>
      </footer>
    </article>`);
  return output;
}

const renderStories = function(story) {
  let $story = createStoryElement(story);
  $('#story').prepend($story);
};

const loadStories = function() {
  $.ajax('../api/stories/' + 6, { method: 'GET' })
    .then(function(response) {
      renderStories(response.story);
    });
};

const loadContributions = function() {
  $.ajax('../api/contributions/', { method: 'GET' })
    .then(function(response) {
      console.log(response)
    });
};


$(document).ready(() => {
  loadStories();
  loadContributions();
});

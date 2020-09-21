const createStoryElement = function(storyData) {
  console.log(storyData)
  let $story = $('<article>').addClass('story');
  let $title = $('<div>').addClass('title').text(storyData.title);
  let $storyHeader = $(`
  <article class="storyheader">
    <div id="author">
    <span id="avatar">Avatar</span>
    <span id="handle">Username</span>
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

const createContributionElement = function(contributionData) {
  let output = $(`<section id="container">
      <article class="">
        <header class="-header">
          <span id="user"></span>
          <span id="handle"></span>
        </header>
        <section class="section">
          <div id="text"></div>
        </section>
        <footer class="footer">
          <div class="icons">
            <i class="far fa-heart fa-xs"></i>
            <output id="upvotes" for="contribution-text">0</output>
          </div>
        </footer>
      </article>
    </section>`);

  return output;
}

const renderStories = function(story) {
  let $story = createStoryElement(story);
  $('#story').prepend($story);
};

const loadStories = function() {
  $.ajax('api/stories/' + 6, { method: 'GET' })
    .then(function(response) {
      renderStories(response.story);
    });
};

$(document).ready(() => {
  loadStories();
});

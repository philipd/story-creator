const createStoryElement = function(storyData) {
  console.log(storyData)
  let $story = $('<article>').addClass('story');
  let $header = $(`
  <header class="-header">
    <span id="author">${storyData.name}</span>
    <span id="handle"></span>
  </header>`);
  let $title = $('<div>').addClass('title').text(storyData.title);
  let $text = $('<p>').addClass('storytext').text(storyData.text);
  let $footer = $(`
    <footer class="footer">
    <div id="storybuttons">
      <div class="openend">
      <button type="submit">End Story</button>
      <button type="button">Open for Contributions</button>
      </div>
      <div class="icons">
        <i class="far fa-heart fa-xs"></i>
        <output class="upvotes">0</output>
      </div>
    </div>
    </footer>`);
  $story.append($title, $text, $footer);
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

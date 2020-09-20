const createStoryElement = function(storyData) {
  let $story = $('<article>').addClass('story');
  let $title = $('<div>').addClass('title').text(storyData.title);
  let $text = $('<p>').addClass('storytext').text(storyData.text);
  let $footer = $(`
    <footer class="footer">
      <div class="icons">
          <i class="fas fa-flag fa-xs"></i>
          <i class="far fa-retweet fa-xs"></i>
          <i class="far fa-heart fa-xs"></i>
      </div>
    </footer>`)
  console.log(storyData)
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
          <div></div>
          <div class="icons"><i class="fas fa-flag fa-xs"></i>
            <i class="far fa-retweet fa-xs"></i>
            <i class="far fa-heart fa-xs"></i></div>
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
  $.ajax('api/stories/' + 3, { method: 'GET' })
    .then(function(response) {
      renderStories(response.story);
    });
};

$(document).ready(() => {
  loadStories();
});

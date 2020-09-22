
const createStoryElement = function(storyData) {
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

const createContributionsContainer = function(contributionData) {
  let output = '';
  console.log(contributionData)
  contributionData.sort(function(a,b) {
    return a.chapter_number - b.chapter_number;
  });
  for (contribution of contributionData) {
    output +=
      `<article class="contribution">
        <article class="contribution-header">
          <div id="contribution-author">
            <span id="contribution-avatar"><img src=${contribution.avatar}></span>
            <span id="contribution-handle">${contribution.name}</span>
          </div>
          <p class="title">Part ${contribution.chapter_number}</p>
          <div class="icons">
            <i id="storyupvote" class="far fa-heart fa-xs"></i>
            <output class="upvotes">${contribution.count}</output>
          </div>
        </article>
        <p>${contribution.ctext}</p>
        <footer class="footer">
          <div class="contributionbuttons">
            <button type="button">Delete Contribution</button>
            <button type="button">Accept Contribution</button>
          </div>
        </footer>
      </article>`;
  }
  return output;
}

const renderStories = function(story) {
  let $story = createStoryElement(story);
  $('#story').prepend($story);
};

const renderContributions = function(contribution, upvotes) {
  let $contribution = createContributionsContainer(contribution, upvotes);
  $('#contributions-container').append($contribution);
};

const storyid = $("#page-data").attr("data-storyid");
const loadStories = function() {
  $.ajax('../api/stories/' + storyid, { method: 'GET' })
    .then(function(response) {
      renderStories(response.story);
    });
};

let storyContributions = [];
const loadContributions = function() {
  $.ajax('../api/contributions/', { method: 'GET' })
    .then(function(response) {
      for (let i = 0; i < response.contributions.length; i++) {
        if (response.contributions[i].story_id == storyid) {
          storyContributions.push(response.contributions[i])
        }
      }
      renderContributions(storyContributions);
    });
};

// const loadUpvotes = function() {
//   $.ajax('../api/upvotes/', { method: 'GET' })
//     .then(function(response) {
//     console.log('Ajax -', response.upvotes)
//       response.upvotes;
//     });
// };

$(document).ready(() => {
  loadStories();
  loadContributions();
  // loadUpvotes();
});


const createStoryElement = function(storyData) {
  console.log('storydata', storyData);
  let currentUser = Number($('#page-data').attr('data-userid'));
  let storyCreator = storyData.user_id;
  let $story = $('<article>').addClass('story');
  let $storyHeader = $(`
  <article class="storyheader" id="main-story" data-current-chapter="${storyData.current_chapter}">
    <div id="author">
    <span id="avatar"><img src=${storyData.avatar}></span>
    <span id="handle"><a href="/stories/user/${storyData.user_id}">${storyData.name}</a></span>
    </div>
    <p class="title">${storyData.title}</p>
    <div class="icons">
    </div>
  </article>`);
  let $text = $('<p>').addClass('storytext').text(storyData.text);
  let $button;
  if (storyData.status === 'complete') {
    $button = $('<button>').attr('type', 'button').attr('id', 'open-btn').attr('data-storyid', storyData.story_id).text('Open for Contributions');
  } else if (storyData.status === 'open') {
    $button = $('<button>').attr('type', 'button').attr('id', 'end-btn').attr('data-storyid', storyData.story_id).text('End Story');
  }
  let $footer = $(`
    <footer class="footer">
      <div id="storybuttons">
      </div>
    </footer>`);
  console.log(currentUser, storyCreator);
  if (currentUser === storyCreator) {
    $($footer.find('#storybuttons')[0]).append($button);
  }
  $story.append($storyHeader, $text, $footer);
  return $story;
};
// <button type="button" id="end-btn" data-storyid="${storyData.story_id}">End Story</button>
// <button type="button" id="open-btn" data-storyid="${storyData.story_id}">Open for Contributions</button>

const createContributionsContainer = function(contributionData) {
  console.log(contributionData);
  let currentUser = $('#page-data').attr('data-userid');
  currentUser = Number(currentUser);

  let output = '';
  contributionData.sort(function(a, b) {
    return a.chapter_number - b.chapter_number;
  });
  for (contribution of contributionData) {
    let storyCreator = contribution.story_creator;
    // console.log('story creator', storyCreator, 'typeof', typeof storyCreator);
    let heartClass = contribution.has_upvoted ? 'red' : '';
    // console.log(heartClass);
    output +=
      `<article class="contribution">
        <article class="contribution-header">
          <div id="contribution-author">
            <span id="contribution-avatar"><img src=${contribution.avatar}></span>
            <span id="contribution-handle"><a href="/stories/user/${contribution.user_id}">${contribution.name}</a></span>
          </div>
          <p class="title">Part ${contribution.chapter_number}</p>
          <div class="icons">
            <i data-contributionid="${contribution.contributions_id}" class="far fa-heart fa-xs ${heartClass}">&nbsp;</i>
            <output class="upvotes">${contribution.count}</output>
          </div>
        </article>
        <p>${contribution.ctext}</p>`;
    if (currentUser === storyCreator) {
      console.log('currentUser', currentUser, 'storyCreator', storyCreator);
      // console.log('contributiondata', contributionData);
      output += `<footer class="footer">
          <div class="contributionbuttons">
            <button type="submit" data-contributionid="${contribution.contributions_id}" class="delete-btn">Delete Contribution</button>
            <button type="submit" data-contributionid="${contribution.contributions_id}" class="accept-btn">Accept Contribution</button>
          </div>
        </footer>`;
    }

    output += `</article>`;
  }
  return output;
};


const createAcceptedContainer = function(acceptedData) {
  let $accepted = $('<article>').addClass('accepted');
  let contributions = createContributionsContainer(acceptedData);
  $accepted.append(contributions);
  return ($accepted);
};

const renderStories = function(story) {
  $('#story').empty();
  let $story = createStoryElement(story);
  $('#story').prepend($story);
};

const renderContributions = function(contribution, upvotes) {
  $('#erasingcontainer').empty();
  let $contribution = createContributionsContainer(contribution, upvotes);
  $('#erasingcontainer').prepend($contribution);
};

const storyid = $("#page-data").attr("data-storyid");

const loadStories = function() {
  console.log('Loading stories ...');
  $.ajax('../api/stories/' + storyid, { method: 'GET' })
    .then(function(response) {
      renderStories(response.story);
      if (response.story.status == 'complete') {
        $('body > main').hide();
        $('#story > article > footer').hide();
      }
    });
};

const renderAccepted = function(accepted) {
  $('#accepted').empty();
  let $accepted = createAcceptedContainer(accepted);
  $("#accepted").append($accepted);
  $('#accepted > article > article > footer').hide();
};

const loadAccepted = function() {
  $.ajax('../api/stories/' + storyid + '/accepted', { method: 'GET' })
    .then(function(response) {
      // $('#story > article > footer').hide();  - HIDES STORY FOOTER (to be used with non owner)
      renderAccepted(response.story);
    });
};

const loadContributions = function() {
  let storyContributions = [];
  $.ajax('../api/contributions/', { method: 'GET' })
    .then(function(response) {
      $('#erasingcontainer').empty();
      let currentChapter = $('#main-story').attr('data-current-chapter');
      currentChapter = Number(currentChapter);
      for (let i = 0; i < response.contributions.length; i++) {
        let contribution = response.contributions[i];
        if (contribution.story_id == storyid && contribution.chapter_number === currentChapter) {
          storyContributions.push(response.contributions[i]);
        }
      }
      renderContributions(storyContributions);
    });
};

const $postContribution = $('#form');
$postContribution.on('submit', function(event) {
  const serializedData = $(this).serialize();
  console.log('Serializedata', serializedData);
  $.post('../api/contributions/' + storyid + '/addcontribution', serializedData)
    .then();

});

// const loadUpvotes = function() {
//   $.ajax('../api/upvotes/', { method: 'GET' })
//     .then(function(response) {
//     console.log('Ajax -', response.upvotes)
//       response.upvotes;
//     });
// };

const addEventListeners = function() {
  $('#story').on('click', '#end-btn', event => {
    console.log('End story');
    const storyId = $(event.target).attr('data-storyid');
    $.ajax('../api/stories/' + storyId + '/complete', { method: 'POST' })
      .then(response => {
        loadStories();
        loadAccepted();

      });
  });

  $('#story').on('click', '#open-btn', event => {
    console.log('Open story');
    const storyId = $(event.target).attr('data-storyid');
    $.ajax('../api/stories/' + storyId + '/open', { method: 'POST' })
      .then(response => {
        console.log('hi');
        loadStories();
        loadAccepted();
      });
  });

  $('#contributions-container').on('click', '.accept-btn', (event) => {
    let contributionId = $(event.target).attr('data-contributionid');
    // console.log(event.target);
    // console.log(contributionId);
    $.ajax('../api/contributions/' + contributionId, { method: 'POST' })
      .then(response => {
        loadStories();
        loadAccepted();
        loadContributions();
        $("html, body").animate({ scrollTop: 0 }, "slow");
      });
  });

  $('body').on('click', '.fa-heart', (event) => {
    let contributionId = $(event.target).attr('data-contributionid');
    $.ajax('../api/upvotes/' + contributionId, { method: 'POST' })
      .then(response => {
        const count = response.upvotes[0].count;
        $(event.target).toggleClass('red');
        $(event.target).siblings('output').text(count);
      });
  });

};

$(document).ready(() => {
  loadStories();
  loadContributions();
  addEventListeners();
  loadAccepted();

  // loadUpvotes();
});

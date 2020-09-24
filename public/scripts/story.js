
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
  let $openButton;
  let $closeButton;
  let $endButton;
  let $theEnd;
  if (storyData.status === 'complete') {
    $theEnd = $('<div>').attr('id', 'the-end').text('THE END!');
  } else if (storyData.status === 'closed') {
    $('#form').hide();
    $endButton = $('<button>').attr('type', 'button').attr('id', 'end-btn').attr('data-storyid', storyData.story_id).text('End Story');
    $openButton = $('<button>').attr('type', 'button').attr('id', 'open-btn').attr('data-storyid', storyData.story_id).text('Open for Contributions');
  } else if (storyData.status === 'open') {
    $endButton = $('<button>').attr('type', 'button').attr('id', 'end-btn').attr('data-storyid', storyData.story_id).text('End Story');
    $closeButton = $('<button>').attr('type', 'button').attr('id', 'close-btn').attr('data-storyid', storyData.story_id).text('Pause Contributions');
  }

  let $footer = $(`
    <footer class="footer">
      <div id="storybuttons">
      </div>
    </footer>`);
  console.log(currentUser, storyCreator);
  if (currentUser === storyCreator) {
    $($footer.find('#storybuttons')[0]).append($openButton, $closeButton, $endButton);
  }
  $story.append($storyHeader, $text);
  $('#story-container').append($footer, $theEnd);
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
        $('#story-container > article > footer').hide();
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
  event.preventDefault();
  const serializedData = $(this).serialize();
  console.log('Serializedata', { method: 'POST', data: serializedData });
  $.ajax('../api/contributions/' + storyid + '/addcontribution', { method: 'POST', data: serializedData })
    .then( response => {
      $('#form').trigger('reset');
      loadContributions();
    });
});

// const loadUpvotes = function() {
//   $.ajax('../api/upvotes/', { method: 'GET' })
//     .then(function(response) {
//     console.log('Ajax -', response.upvotes)
//       response.upvotes;
//     });
// };

const addEventListeners = function() {
  $('#story-container').on('click', '#end-btn', event => {
    console.log('End story');
    const storyId = $(event.target).attr('data-storyid');
    $.ajax('../api/stories/' + storyId + '/complete', { method: 'POST' })
      .then(response => {
        loadStories();
        loadAccepted();
        $('#story-container > footer').remove();
      });
  });

  $('#story-container').on('click', '#close-btn', event => {
    console.log('Closed story');
    const storyId = $(event.target).attr('data-storyid');
    $.ajax('../api/stories/' + storyId + '/closed', { method: 'POST' })
      .then(response => {
        console.log('hi');
        loadStories();
        loadAccepted();
        $('#story-container > footer').hide();
        $('#form').hide();
      });
  });

  $('#story-container').on('click', '#open-btn', event => {
    console.log('Open story');
    const storyId = $(event.target).attr('data-storyid');
    $.ajax('../api/stories/' + storyId + '/open', { method: 'POST' })
      .then(response => {
        console.log('hi');
        loadStories();
        loadAccepted();
        $('#story-container > footer').hide();
        $('#form').show();
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
        $('#story-container > footer').hide();
      });
  });

  $('#contributions-container').on('click', '.delete-btn', (event) => {
    let contributionId = $(event.target).attr('data-contributionid');
    // console.log(event.target);
    // console.log(contributionId);
    $.ajax('../api/contributions/' + contributionId + '/delete', { method: 'POST' })
      .then(response => {
        loadStories();
        loadAccepted();
        loadContributions();
        $('#story-container > footer').hide();
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

  // $('button #post-contribution').on('submit', event => {
  //   event.preventDefault();
  //   console.log('it works!');
  // });

};

$(document).ready(() => {
  loadStories();
  loadContributions();
  addEventListeners();
  loadAccepted();

  // loadUpvotes();
});

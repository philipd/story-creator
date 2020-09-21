const createContributionElement = function(contributionData) {
  let $contribution = $('<article>').addClass('contribution');
  let $title = $('<span>').addClass('title').text(contributionData.title);
  let $author = $('<span>').addClass('author').text(contributionData.name);
  let $chapter_number = $('<span>').addClass('chapter_number').text(contributionData.chapter_number);
  let $text = $('<span>').addClass('text').text(contributionData.text);
  $contribution.append($title, $author, $chapter_number, $text);
  return $contribution;
};

const renderContributions = function(contributions) {
  for (const contribution of contributions) {
    let $contribution = createContributionElement(contribution);
    $('#contributions').prepend($contribution);
  }
};

const loadContributions = function() {
  // Get the current URL
  const url = $(location).attr('href');
  // Get the requested userid, if it exists
  const userid = Number(url.split('/').slice(-1)[0]);

  if (!isNaN(userid)) {
    // Get contributions by userid
    $.ajax('../../api/contributions/user/' + userid, { method: 'GET' })
      .then(function(response) {
        console.log('Ajax response:', response);
        renderContributions(response.contributions);
      });
  }
};

$(document).ready(() => {
  loadContributions();
});

const db = require('./db');
const { response } = require('express');

const getStories = () => {
  return db.query(`
    SELECT stories.id as story_id, stories.title, stories.text, stories.status, users.name, users.id as user_id, users.avatar
    FROM stories
    JOIN users
      ON stories.user_id = users.id
    ORDER BY stories.id
  ;`)
    .then((response) => {
      return response.rows;
    });
};

const getStoriesById = (storyid) => {
  return db.query(`
  SELECT stories.*,
    contributions.*,
    users.*,
    COALESCE ((
      SELECT MAX(chapter_number)+1
      FROM contributions
      WHERE accepted=true
        AND story_id = stories.id
    ), 1) as current_chapter
  FROM stories
  JOIN users ON stories.user_id = users.id
  LEFT OUTER JOIN contributions ON contributions.story_id = stories.id
  WHERE stories.id = $1`, [storyid])
    .then((response) => {
      console.log(response.rows);
      return response.rows[0];
    });
};

const getContributionsById = (contributionid) => {
  return db.query(`SELECT stories.*, contributions.*, users.*, contributions.id as contributions_id
  FROM contributions
  JOIN users ON contributions.user_id = users.id
  JOIN stories ON contributions.story_id = stories.id
  WHERE contributions.id = $1`, [contributionid])
    .then((response) => {
      return response.rows[0];
    });
};

const getUpvotes = () => {
  return db.query(`select contributions.*, COUNT(upvotes.*)
  from contributions join upvotes on contributions.id = upvotes.contribution_id
  where contributions.id = upvotes.contribution_id
  group by contributions.id;`)
    .then((response) => {
      return response.rows;
    });
};



const getStoriesByUserId = (id) => {
  return db.query('SELECT * FROM stories WHERE stories.user_id = $1', [id])
    .then((response) => {
      return response.rows;
    });
};

const addStory = (user_id, title, text) => {
  return db.query(`
    INSERT INTO stories
      (user_id, title, text)
    VALUES
      ($1, $2, $3)
  `, [user_id, title, text]).then(response => {
    return response.rows;
  });
};

const getContributions = (user_id) => {
  return db.query(`
  SELECT
    (CASE WHEN EXISTS
      (SELECT * FROM upvotes WHERE active = true AND user_id = $1 AND contribution_id = contributions.id)
      THEN true ELSE false END) as has_upvoted,
    stories.*,
    contributions.*,
    users.*,
    contributions.id as contributions_id,
    COUNT(case when upvotes.active then upvotes.* end) as count
  FROM contributions
  JOIN users
    ON contributions.user_id = users.id
  JOIN stories
    ON contributions.story_id = stories.id
  FULL OUTER JOIN upvotes
    ON contributions.id = upvotes.contribution_id
  GROUP BY stories.id, contributions.id, users.id
  `, [user_id])
    .then((response) => {
      return response.rows;
    });
};

const getAcceptedContributionsByStoryId = (storyid) => {
  return db.query(`
    SELECT contributions.id as contributions_id, story_id, contributions.user_id, chapter_number, ctext,  COUNT(upvotes.*) as count,  users.*
    FROM contributions
    FULL OUTER JOIN upvotes ON contributions.id = upvotes.contribution_id
    JOIN users ON contributions.user_id = users.id
    JOIN stories ON contributions.story_id = stories.id
    WHERE story_id = $1
      AND accepted = true
    GROUP by stories.id, contributions.id, users.id
    ORDER BY chapter_number ASC;
  `, [storyid])
    .then(response => {
      return response.rows;
    });
};

const setStoryStatus = (storyid, userid, status) => {
  // Not currently using userid, but eventually we might want
  // to prohibit anyone but the story creator from changing the
  // story status
  console.log(storyid, userid, status);
  return db.query(`
    UPDATE stories
    SET status = $2
    WHERE id = $1
  `, [storyid, status])
    .then(response => {
      return response;
    });
};

module.exports = {
  getStories,
  getStoriesById,
  getContributions,
  getContributionsById,
  getUpvotes,
  getStoriesByUserId,
  addStory,
  getAcceptedContributionsByStoryId,
  setStoryStatus
};

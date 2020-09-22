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
  return db.query(`SELECT stories.*, contributions.*, users.*
  FROM stories
  JOIN users ON stories.user_id = users.id
  LEFT OUTER JOIN contributions ON contributions.story_id = stories.id
  WHERE stories.id = $1`, [storyid])
    .then((response) => {
      return response.rows[0];
    });
};

const getContributions = () => {
  return db.query(`SELECT stories.*, contributions.*, users.*, contributions.id as contributions_id, COUNT(upvotes.*) as count
  FROM contributions
  JOIN users ON contributions.user_id = users.id
  JOIN stories ON contributions.story_id = stories.id
  FULL OUTER JOIN upvotes ON contributions.id = upvotes.contribution_id
  group by stories.id, contributions.id, users.id`)
    .then((response) => {
      return response.rows;
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
  return db.query('SELECT * FROM stories WHERE stories.user_id = $1',[id])
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
  `,[user_id, title, text]).then(response => {
    return response.rows;
  });
};

module.exports = {
  getStories,
  getStoriesById,
  getContributions,
  getContributionsById,
  getUpvotes,
  getStoriesByUserId,
  addStory
};

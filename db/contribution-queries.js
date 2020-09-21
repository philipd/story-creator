const db = require('./db');
const { response } = require('express');

const getContributionsByUserId = (id) => {
  return db.query(`
    SELECT contributions.*, stories.title, users.name
    FROM contributions
    JOIN stories
      ON contributions.story_id = stories.id
    JOIN users
      ON stories.user_id = users.id
    WHERE contributions.user_id = $1`,[id])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getContributionsByUserId,
};

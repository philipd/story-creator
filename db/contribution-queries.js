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
    WHERE contributions.user_id = $1`, [id])
    .then((response) => {
      return response.rows;
    });
};

const acceptContribution = (contributionId) => {
  return db.query(`
    UPDATE contributions
    SET accepted = true
    WHERE id = $1
  `, [contributionId]);
};

const addContribution = (storyId, userId, text) => {
  return db.query(`
    INSERT INTO contributions
      (story_id, user_id, ctext, chapter_number)
    VALUES
      ($1, $2, $3, (
        SELECT MAX(chapter_number+1)
        FROM contributions
        WHERE story_id = $1
          AND accepted = true
      ))
  ;`, [storyId, userId, text]);
};

// insert into contributions (story_id, user_id, ctext, chapter_number) values (2, 1, 'Ground control to Major Tom', (SELECT MAX(chapter_number+1) FROM contributions where story_id = 2 AND accepted = true));

module.exports = {
  getContributionsByUserId, acceptContribution, addContribution
};

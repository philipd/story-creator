const db = require('./db');
const { response } = require('express');

const getStories = () => {
  return db.query('SELECT * FROM stories;')
    .then((response) => {
      return response.rows;
    });
};

const getStoriesById = (storyid) => {
  return db.query(`SELECT stories.*, contributions.*, users.*
  FROM stories
  JOIN users ON stories.user_id = users.id
  JOIN contributions ON contributions.story_id = stories.id
  WHERE stories.id = $1`, [storyid])
    .then((response) => {
      return response.rows[0];
    });
};

const getStoriesByUserId = (id) => {
  return db.query('SELECT * FROM stories WHERE stories.user_id = $1',[id])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getStories,
  getStoriesById,
  getStoriesByUserId
};

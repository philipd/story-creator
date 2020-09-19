const db = require('./db');
const { response } = require('express');

const getStories = () => {
  return db.query('SELECT * FROM stories;')
    .then((response) => {
      return response.rows;
    });
};

const getStoriesById = (id) => {
  return db.query('SELECT * FROM stories WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getStories,
  getStoriesById
};

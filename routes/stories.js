const express = require('express');
const router = express.Router();
const { getStories, getStoriesById } = require('../db/story-queries');

// GET /stories/
router.get('/', (req, res) => {
  getStories()
    .then((stories) => {
      res.json({ stories });
    });
});

// GET /stories/:storyid
router.get('/:storyid', (req, res) => {
  getStoriesById(req.params.id)
    .then((story) => {
      res.json({ story });
    })
});

module.exports = router;


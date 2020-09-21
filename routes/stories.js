const express = require('express');
const router = express.Router();
const { getStories, getStoriesById, getStoriesByUserId } = require('../db/story-queries');

// GET /stories/
router.get('/', (req, res) => {
  getStories()
    .then((stories) => {
      res.json({ stories });
    });
});

// GET /stories/:storyid
router.get('/:storyid', (req, res) => {
  getStoriesById(req.params.storyid)
    .then((story) => {
      res.json({ story });
    })
});

// GET stories by user id: /stories/user/:userid
router.get('/user/:userid', (req, res) => {
  getStoriesByUserId(req.params.userid)
    .then((stories) => {
      res.json({ stories });
    })
});

module.exports = router;


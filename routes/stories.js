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
      console.log(story);
      res.json({ story });
    })
});

// GET stories by user id: /stories/user/:userid
router.get('/user/:userid', (req, res) => {
  console.log('Req.params:',req.params);
  getStoriesByUserId(req.params.userid)
    .then((stories) => {
      console.log('Response:',stories);
      res.json({ story: stories });
    })
});

module.exports = router;


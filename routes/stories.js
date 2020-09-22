const express = require('express');
const router = express.Router();
const { getStories, getStoriesById, getStoriesByUserId, addStory, getAcceptedContributionsByStoryId } = require('../db/story-queries');

// GET /stories/
router.get('/', (req, res) => {
  getStories()
    .then((stories) => {
      res.json({ stories });
    });
});

router.get('/:storyid/accepted', (req, res) => {
  getAcceptedContributionsByStoryId(req.params.storyid)
    .then((story) => {
      res.json({ story });
    })
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

router.post('/', (req, res) => {
  addStory(req.session.userid, req.body.title, req.body.text)
    .then( response => {
      return res.redirect('/stories/user/'+req.session.userid);
    })
});

module.exports = router;


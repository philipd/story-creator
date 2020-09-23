const express = require('express');
const router = express.Router();
const { getStories, getStoriesById, getStoriesByUserId, addStory, getAcceptedContributionsByStoryId, setStoryStatus } = require('../db/story-queries');

// GET /stories/
router.get('/', (req, res) => {
  getStories()
    .then((stories) => {
      res.json({ stories });
    });
});

router.get('/:storyid/accepted', (req, res) => {
  getAcceptedContributionsByStoryId(req.params.storyid, req.session.userid)
    .then((story) => {
      res.json({ story });
    })
});

// GET /stories/:storyid
router.get('/:storyid', (req, res) => {
  getStoriesById(req.params.storyid)
    .then((story) => {
      res.json({ story, currentUser: req.session.userid });
    })
});

// GET stories by user id: /stories/user/:userid
router.get('/user/:userid', (req, res) => {
  getStoriesByUserId(req.params.userid)
    .then((stories) => {
      res.json({ stories });
    })
});

router.post('/:storyid/complete', (req, res) => {
  setStoryStatus(req.params.storyid, req.session.userid, 'complete')
  .then( response => {
    res.json(response);
  })
});

router.post('/:storyid/open', (req, res) => {
  setStoryStatus(req.params.storyid, req.session.userid, 'open')
  .then( response => {
    res.json(response);
  })
});

router.post('/:storyid/closed', (req, res) => {
  setStoryStatus(req.params.storyid, req.session.userid, 'closed')
  .then( response => {
    res.json(response);
  })
});

router.post('/', (req, res) => {
  addStory(req.session.userid, req.body.title, req.body.text)
    .then( response => {
      return res.redirect('/stories/user/'+req.session.userid);
    })
});

module.exports = router;


const express = require('express');
const router = express.Router();
const { getContributionsByUserId, acceptContribution, addContribution, deleteContribution } = require('../db/contribution-queries');
const { getContributionsById, getContributions } = require('../db/story-queries');

// GET contributions by user id: /contributions/user/:userid
router.get('/user/:userid', (req, res) => {
  getContributionsByUserId(req.params.userid)
    .then((contributions) => {
      res.json({ contributions });
    });
});

// GET /contributions/
router.get('/', (req, res) => {
  getContributions(req.session.userid)
    .then((contributions) => {
      res.json({ contributions });
    });
});

// GET /contributions/:contributionid
router.get('/:contributionid', (req, res) => {
  getContributionsById(req.params.contributionid)
    .then((contribution) => {
      res.json({ contribution });
    });
});

router.post('/:contributionid', (req, res) => {
  acceptContribution(req.params.contributionid)
    .then((contribution) => {
      res.json({ contribution });
    });
});

router.post('/:contributionid/delete', (req, res) => {
  deleteContribution(req.params.contributionid)
    .then((contribution) => {
      res.json({ contribution });
    });
});

router.post('/:storyid/addcontribution', (req, res) => {
  const user_id = req.session.userid;
  const story_id = req.params.storyid;
  const { text } = req.body;
  addContribution( story_id, user_id, text )
    .then((contribution) => {
      res.json({ contribution });
    });
});

module.exports = router;


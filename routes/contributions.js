const express = require('express');
const router = express.Router();
const { getContributionsByUserId, acceptContribution } = require('../db/contribution-queries');
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
  getContributions()
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
  console.log(req.params);
  acceptContribution(req.params.contributionid)
    .then((contribution) => {
      res.json({ contribution });
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const user_id = req.session.userid;
  const { story_id, chapter_number, ctext } = req.body;
  addContribution( story_id, user_id, chapter_number, ctext )
    .then((contribution) => {
      res.json({ contribution });
    });
});

module.exports = router;


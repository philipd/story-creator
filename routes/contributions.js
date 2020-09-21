const express = require('express');
const router = express.Router();
const { getContributionsByUserId } = require('../db/contribution-queries');
const { getContributionsById, getContributions } = require('../db/story-queries');

// GET contributions by user id: /contributions/user/:userid
router.get('/user/:userid', (req, res) => {
  getContributionsByUserId(req.params.userid)
    .then((contributions) => {
      res.json({ contributions });
    })
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
    })
});

module.exports = router;


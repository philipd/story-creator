const express = require('express');
const router = express.Router();
const { getContributionsByUserId } = require('../db/contribution-queries');

// GET contributions by user id: /contributions/user/:userid
router.get('/user/:userid', (req, res) => {
  getContributionsByUserId(req.params.userid)
    .then((contributions) => {
      res.json({ contributions });
    })
});

module.exports = router;

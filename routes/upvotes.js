const express = require('express');
const router = express.Router();
const { getUpvotes } = require('../db/story-queries');
const { vote } = require('../db/upvote-queries');

// GET /upvotes/
router.get('/', (req, res) => {
  getUpvotes()
    .then((upvotes) => {
      res.json({ upvotes });
    });
});

// Upvote or downvote a contribution
router.post('/:contribution_id', (req, res) => {
  const user_id = req.session.userid;
  const contribution_id = req.params.contribution_id;
  vote(user_id, contribution_id)
    .then((upvotes) => {
      res.json({ upvotes });
    });
});

module.exports = router;

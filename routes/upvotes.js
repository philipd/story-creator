const express = require('express');
const router = express.Router();
const { getUpvotes } = require('../db/story-queries');

// GET /upvotes/
router.get('/', (req, res) => {
  getUpvotes()
    .then((upvotes) => {
      res.json({ upvotes });
    });
});

module.exports = router;

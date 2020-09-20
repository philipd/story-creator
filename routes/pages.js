const express = require('express');
const router = express.Router();

// GET /stories/:storyid
router.get('/stories', (req, res) => {
  let templateVars = { userid: 1 };
  res.render("stories", templateVars);
});

router.get("/story", (req, res) => {
  res.render("story");
});

module.exports = router;


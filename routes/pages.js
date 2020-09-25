const express = require('express');
const router = express.Router();

router.get('/stories/user/:authorid', (req, res) => {
  if(!req.session.userid)
    return res.redirect('/');

  let templateVars = { userid: req.session.userid, authorid: req.params.authorid };
  res.render("mystories", templateVars);
});

router.get('/stories/:storyid', (req, res) => {
  if(!req.session.userid)
    return res.redirect('/');

  let templateVars = { userid: req.session.userid, storyid: req.params.storyid };
  res.render("story", templateVars);
});

router.get('/stories', (req, res) => {
  if(!req.session.userid)
    return res.redirect('/');

  let templateVars = { userid: req.session.userid };
  res.render("stories", templateVars);
});

router.get("/story", (req, res) => {
  if(!req.session.userid)
    return res.redirect('/');

  let templateVars = { userid: req.session.userid, storyid: req.params.storyid };
  res.render("story", templateVars);
});

router.get("/newstory", (req, res) => {
  if(!req.session.userid)
    return res.redirect('/');

  let templateVars = { userid: req.session.userid };
  res.render("newstory", templateVars);
});

router.get('/contributions/user/:userid', (req, res) => {
  if(!req.session.userid)
    return res.redirect('/');

  let templateVars = { userid: req.session.userid };
  res.render("mycontributions", templateVars);
});

router.get("/login/:userid", (req, res) => {
  req.session.userid = req.params.userid;
  return res.redirect('/stories');
});

router.get("/login", (req, res) => {
  req.session.userid = 3;
  return res.redirect('/stories/user/3');
});

router.get('/logout', (req, res) => {
  req.session = null;
  return res.redirect('/');
});

router.get("/", (req, res) => {
  if (req.session.userid) {
    res.redirect('/stories');
  } else {
    let templateVars = { userid: undefined };
    res.render("index", templateVars);
  }
});

module.exports = router;


const express = require('express');
const router = express.Router();

router.get('/stories/user/:userid', (req, res) => {
  let templateVars = { userid: req.session.userid };
  res.render("mystories", templateVars);
});

router.get('/stories', (req, res) => {
  let templateVars = { userid: req.session.userid };
  res.render("stories", templateVars);
});

router.get("/story", (req, res) => {
  let templateVars = { userid: req.session.userid };
  res.render("story", templateVars);
});

router.get('/contributions/user/:userid', (req, res) => {
  let templateVars = { userid: req.session.userid };
  res.render("mycontributions", templateVars);
});

router.get("/login/:userid", (req, res) => {
  req.session.userid = req.params.userid;
  return res.redirect('/stories');
});

router.get("/login", (req, res) => {
  req.session.userid = 1;
  return res.redirect('/stories');
});

router.get('/logout', (req, res) => {
  req.session = null;
  return res.redirect('/');
});

module.exports = router;


// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const db         = require('./db/db.js');
const cookieSession = require('cookie-session');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({ secret: process.env.SESSION_SECRET || 'examplesecret59kjhwEF2h5WEF' }));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const pageRouter = require("./routes/pages");
const userRouter = require("./routes/users");
const storiesRouter = require("./routes/stories");
const contributionsRouter = require("./routes/contributions");
const upvotesRouter = require("./routes/upvotes");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", pageRouter);
app.use("/api/users", userRouter);
app.use("/api/users/:userid", userRouter);
app.use("/api/stories", storiesRouter);
app.use("/api/stories/:storyid", storiesRouter);
app.use("/api/contributions", contributionsRouter);
app.use("/api/upvotes", upvotesRouter);
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

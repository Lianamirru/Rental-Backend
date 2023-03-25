const express = require("express");
const movies = require("../routes/movies");
const genres = require("../routes/genres");
const users = require("../routes/users");
const auth = require("../routes/auth");
const likes = require("../routes/likes");

module.exports = (app) => {
  app.use(express.json());
  // apply middleware to every req
  // app.use(auth_middlware);
  app.use("/api/movies", movies);
  app.use("/api/genres", genres);
  app.use("/api/likes", likes);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};

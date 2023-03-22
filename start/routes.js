const express = require("express");
const movies = require("../routes/movies");
const genres = require("../routes/genres");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/movies", movies);
  app.use("/api/genres", genres);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};

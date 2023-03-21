const express = require("express");
const movies = require("../routes/movies");
const genres = require("../routes/genres");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/movies", movies);
  app.use("/api/genres", genres);
};

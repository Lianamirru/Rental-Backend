const express = require("express");

const error = require("../middleware/error");
const movies = require("../routes/movies");
const genres = require("../routes/genres");
const users = require("../routes/users");
const auth = require("../routes/auth");
const likes = require("../routes/likes");
const rentals = require("../routes/rentals");
const returns = require("../routes/returns");
const customers = require("../routes/customers");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/movies", movies);
  app.use("/api/genres", genres);
  app.use("/api/likes", likes);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/rentals", rentals);
  app.use("/api/returns", returns);
  app.use("/api/customers", customers);
  app.use(error);
};

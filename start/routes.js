const express = require("express");

const error = require("../middleware/error");
const instruments = require("../routes/instruments");
const categories = require("../routes/categories");
const users = require("../routes/users");
const auth = require("../routes/auth");
const likes = require("../routes/likes");
const cart = require("../routes/cart");
const rentals = require("../routes/rentals");
const returns = require("../routes/returns");
const customers = require("../routes/customers");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/instruments", instruments);
  app.use("/api/categories", categories);
  app.use("/api/likes", likes);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/cart", cart);
  app.use("/api/rentals", rentals);
  app.use("/api/returns", returns);
  app.use("/api/customers", customers);
  app.use(error);
};

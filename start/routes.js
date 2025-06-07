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
const seed = require("../routes/seed");

module.exports = (app) => {
  app.use(express.json());
  app.use("/instruments", instruments);
  app.use("/categories", categories);
  app.use("/likes", likes);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use("/cart", cart);
  app.use("/rentals", rentals);
  app.use("/returns", returns);
  app.use("/customers", customers);
  app.use("/seed", seed);
  app.use(error);
};

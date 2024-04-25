const express = require("express");
const router = express.Router();

const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const categories = await Category.find().select("-__v").sort("category");
  res.send(categories);
});

module.exports = router;

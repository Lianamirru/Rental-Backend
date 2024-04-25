const express = require("express");

const { Instrument } = require("../models/instrument");

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Instrument.find().select("-__v").sort("maker model");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const instrument = await Instrument.findById(req.params.id).select("-__v");

  if (!instrument)
    return res
      .status(404)
      .send("The instrument with the given ID was not found.");

  res.send(instrument);
});

module.exports = router;

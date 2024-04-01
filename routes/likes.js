const express = require("express");
const auth = require("../middleware/authorization");

const { Like, validate } = require("../models/like");
const { Instrument } = require("../models/instrument");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const userId = req.user._id;

  const likedInstruments = await Like.find({ userId })
    .select("instrumentId")
    .lean();
  const likedInstrumentIds = likedInstruments.map((like) => {
    return like.instrumentId;
  });

  res.send(likedInstrumentIds);
});

router.post("/:instrumentId", [auth], async (req, res) => {
  const { instrumentId } = req.params;
  const userId = req.user._id;

  const { error } = validate({ instrumentId, userId });
  if (error) return res.status(400).send(error.details[0].message);

  const existingLike = await Like.findOne({ userId, instrumentId });

  const instrument = await Instrument.findById(instrumentId);
  const user = await User.findById(userId);

  if (!instrument) return res.status(404).send("instrument is not found");
  if (!user) return res.status(404).send("user is not found");

  if (existingLike) await Like.deleteOne(existingLike);
  else {
    const like = new Like({
      userId: user._id,
      instrumentId,
    });
    await like.save();
  }

  const message = `${user.name} ${existingLike ? "unliked" : "liked"} ${
    instrument.model
  } successfully`;

  return res.status(201).send(message);
});

module.exports = router;

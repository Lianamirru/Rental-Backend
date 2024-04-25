const express = require("express");
const auth = require("../middleware/authorization");

const { Cart, validate } = require("../models/cart");
const { Instrument } = require("../models/instrument");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const userId = req.user._id;

  const cartItems = await Cart.find({ userId }).select("instrument");
  res.send(cartItems);
});

router.post("/:instrumentId", auth, async (req, res) => {
  const { instrumentId } = req.params;
  const userId = req.user._id;

  const { error } = validate({ instrumentId, userId });
  if (error) return res.status(400).send(error.details[0].message);

  const instrument = await Instrument.findById(instrumentId);
  const user = await User.findById(userId);

  if (!instrument) return res.status(404).send("instrument is not found");
  if (!user) return res.status(404).send("user is not found");

  const cartItem = new Cart({
    userId: user._id,
    instrument,
  });
  await cartItem.save();
  return res.status(201).send(cartItem);
});

router.get("/:id", async (req, res) => {
  const cartItem = await Cart.findById(req.params.id).select("-__v");

  if (!cartItem)
    return res
      .status(404)
      .send("The cartItem with the given ID was not found.");

  res.send(cartItem);
});

router.delete("/:instrumentId", auth, async (req, res) => {
  const { instrumentId } = req.params;
  const userId = req.user._id;

  const { error } = validate({ instrumentId, userId });
  if (error) return res.status(400).send(error.details[0].message);

  const instrument = await Instrument.findById(instrumentId);
  if (!instrument) return res.status(404).send("instrument is not found");

  const cartItem = await Cart.findOne({ instrument, userId });

  if (!cartItem)
    return res
      .status(404)
      .send("The cartItem with the given ID was not found.");

  await Cart.findByIdAndRemove(cartItem._id);

  res.send(cartItem);
});

module.exports = router;

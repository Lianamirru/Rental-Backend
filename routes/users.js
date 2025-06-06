const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const auth = require("../middleware/authorization");
const { User, validate } = require("../models/user");
const { Customer } = require("../models/customer");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const userId = req.user._id;
  const customer = await Customer.find({ userId });
  if (customer) res.send(customer);
  const user = await User.findById(userId).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["_id", "email"]));
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    userId: req.body.userId,
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();

  res.send(customer._id);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    // get back updated document not initial
    { new: true }
  );

  if (!instrument)
    return res
      .status(404)
      .send("The instrument with the given ID was not found.");

  res.send(instrument);
});

module.exports = router;

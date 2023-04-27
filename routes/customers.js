const express = require("express");

const { Customer, validate } = require("../models/customer");
const auth = require("../middleware/authorization");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const customers = await Customer.find().select("-__v").sort("name");
  res.send(customers);
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

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      // isGold: req.body.isGold,
      userId: req.body.userId,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.get("/:userId", auth, async (req, res) => {
  const customer = await Customer.findOne({
    userId: req.params.userId,
  }).select("name phone _id");

  if (!customer) return res.send(null);

  res.send(customer);
});

module.exports = router;

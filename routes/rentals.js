const express = require("express");

const { Rental, validate } = require("../models/rental");
const { Instrument } = require("../models/instrument");
const { Customer } = require("../models/customer");

const auth = require("../middleware/authorization");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const { instrumentId } = req.query;
  if (instrumentId) {
    const rentedDates = await Rental.find({ "instrument._id": instrumentId })
      .select("dateOut dateReturned -_id")
      .sort("dateOut");

    result = rentedDates ?? [];
    res.send(result);
  } else {
    if (req.user.isAdmin) {
      const rentals = await Rental.find()
        .select("customer instrument dateOut dateReturned rentalFee")
        .sort("dateReturned");
      res.send(rentals ?? []);
    } else {
      const customer = await Customer.findOne({ userId: req.user._id });
      const rentals = await Rental.find({ "customer._id": customer?._id })
        .select("instrument dateOut dateReturned rentalFee")
        .sort("dateReturned");
      res.send(rentals ?? []);
    }
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { dateOut, dateReturned } = req.body;

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const instrument = await Instrument.findById(req.body.instrumentId);
  if (!instrument) return res.status(400).send("Invalid instrument.");

  const timeDifference = Math.abs(new Date(dateReturned) - new Date(dateOut));
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    instrument: {
      _id: instrument._id,
      maker: instrument.maker,
      model: instrument.model,
      year: instrument.year,
    },
    dateOut,
    dateReturned,
    rentalFee: (daysDifference + 1) * (instrument.monthlyRentalPrice / 30),
  });

  rental.save();
  res.send(rental);
});

router.get("/:id", [auth], async (req, res) => {
  const rental = await Rental.findById(req.params.id).select("-__v");

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

router.delete("/:id", async (req, res) => {
  let rental = await Rental.findByIdAndRemove(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

module.exports = router;

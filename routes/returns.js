const express = require("express");

const { Return } = require("../models/return");
const { Instrument } = require("../models/instrument");

const auth = require("../middleware/authorization");
const admin = require("../middleware/admin");

const router = express.Router();

router.post("/", [auth, admin], async (req, res) => {
  const rental = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeDifference = Math.abs(
    new Date(today).getTime() - new Date(rental.dateOut).getTime()
  );

  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const instrument = await Instrument.findById(rental.instrument._id);

  const newReturn = new Return({
    ...rental,
    dateReturned: new Date(),
    rentalFee: (daysDifference + 1) * (instrument.monthlyRentalPrice / 30),
  });

  newReturn.save();
  res.send({ rentalFee: newReturn.rentalFee });
});

module.exports = router;

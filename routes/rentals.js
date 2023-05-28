const express = require("express");

const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");

const auth = require("../middleware/authorization");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const { movieId } = req.query;

  if (movieId) {
    const rentedDates = await Rental.find({
      "movie._id": movieId,
    })
      .select("dateOut dateReturned -_id")
      .sort("dateOut");

    result = rentedDates ?? [];
    res.send(result);
  } else {
    if (req.user.isAdmin) {
      const rentals = await Rental.find()
        .select("customer movie dateOut dateReturned rentalFee")
        .sort("dateReturned");
      res.send(rentals ?? []);
    } else {
      const customer = await Customer.findOne({ userId: req.user._id });

      const rentals = await Rental.find({ "customer._id": customer?._id })
        .select("movie dateOut dateReturned rentalFee")
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

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  const timeDifference = Math.abs(new Date(dateReturned) - new Date(dateOut));
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
    },
    dateOut,
    dateReturned,
    rentalFee: (daysDifference + 1) * movie.dailyRentalRate,
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

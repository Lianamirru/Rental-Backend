const express = require("express");
const moment = require("moment");
const auth = require("../middleware/authorization");
const admin = require("../middleware/admin");

const { Instrument, validate } = require("../models/instrument");
// const { Genre } = require("../models/genre");

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Instrument.find().select("-__v").sort("maker model");
  res.send(movies);
});

// router.post("/", [auth, admin], async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findById(req.body.genreId);
//   if (!genre) return res.status(400).send("Invalid genre.");

//   const movie = new Movie({
//     title: req.body.title,
//     genre: {
//       _id: genre._id,
//       name: genre.name,
//     },
//     numberInStock: req.body.numberInStock,
//     dailyRentalRate: req.body.dailyRentalRate,
//     publishDate: moment().toJSON(),
//   });

//   // if we pass invalid properties when sending an object to db
//   try {
//     await movie.save();
//     res.send(movie);
//   } catch (ex) {
//     console.log(ex.message);
//     res.send(ex.message);
//   }
// });

// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findById(req.body.genreId);
//   if (!genre) return res.status(400).send("Invalid genre.");

//   const movie = await Movie.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title,
//       genre: {
//         _id: genre._id,
//         name: genre.name,
//       },
//       numberInStock: req.body.numberInStock,
//       dailyRentalRate: req.body.dailyRentalRate,
//     },
//     // get back updated document not initial
//     { new: true }
//   );

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

// router.delete("/:id", async (req, res) => {
//   const movie = await Movie.findByIdAndRemove(req.params.id);

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

router.get("/:id", async (req, res) => {
  const instrument = await Instrument.findById(req.params.id).select("-__v");

  if (!instrument)
    return res
      .status(404)
      .send("The instrument with the given ID was not found.");

  res.send(instrument);
});

module.exports = router;

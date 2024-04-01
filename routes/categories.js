const express = require("express");
const objectId = require("../middleware/validateObjectId");
const auth = require("../middleware/authorization");
const admin = require("../middleware/admin");

const router = express.Router();

const { Category, validate } = require("../models/category");

router.get("/", async (req, res) => {
  const genres = await Category.find().select("-__v").sort("category");
  res.send(genres);
});

// router.get("/:id", objectId, async (req, res) => {
//   const genre = await Genre.findById(req.params.id);
//   if (!genre) return res.status(404).send("genre not found");

//   res.send(genre);
// });

// router.post("/", auth, async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let genre = new Genre({ name: req.body.name });
//   genre = await genre.save();

//   res.send(genre);
// });

// router.delete("/:id", auth, admin, objectId, async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

module.exports = router;

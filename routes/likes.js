const express = require("express");
const auth = require("../middleware/authorization");

const { Like, validate } = require("../models/like");
const { Movie } = require("../models/movie");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const userId = req.user._id;

  const likedMovies = await Like.find({ userId }).select("movieId").lean();
  const likedMovieIds = likedMovies.map((like) => {
    return like.movieId;
  });

  res.send(likedMovieIds);
});

router.post("/:movieId", [auth], async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  const { error } = validate({ movieId, userId });
  if (error) return res.status(400).send(error.details[0].message);

  const existingLike = await Like.findOne({ userId, movieId });

  const movie = await Movie.findByIdAndUpdate(
    movieId,
    { $inc: { likes: existingLike ? -1 : 1 } },
    { new: true }
  );

  if (!movie) return res.status(404).send("Movie is not found");

  if (existingLike) await Like.deleteOne(existingLike);
  else {
    const user = await User.findById(userId);
    const like = new Like({
      userId: user._id,
      movieId: movie._id,
    });
    await like.save();
  }

  const message = `${userId} ${existingLike ? "unliked" : "liked"} ${
    movie.title
  } successfully`;

  return res.status(201).send(message);
});

module.exports = router;

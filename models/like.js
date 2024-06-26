const Joi = require("joi");
const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: String,
  instrumentId: String,
});

const Like = mongoose.model("Like", likeSchema);

function validateLike(like) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    instrumentId: Joi.objectId().required(),
  });

  return schema.validate(like);
}

exports.likeSchema = likeSchema;
exports.Like = Like;
exports.validate = validateLike;

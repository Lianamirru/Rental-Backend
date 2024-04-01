const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const instrumentSchema = new mongoose.Schema({
  category: categorySchema,
  type: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  maker: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  model: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  year: {
    type: Number,
    required: true,
    min: 2000,
    max: 2024,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  monthlyRentalPrice: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  like: { type: Boolean, default: false },
  image: { data: Buffer, contentType: String },
  description: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 555,
  },
});

const Instrument = mongoose.model("Instrument", instrumentSchema);

function validateInstrument(instrument) {
  const schema = Joi.object({
    type: Joi.string().min(4).max(255).required(),
    maker: Joi.string().min(4).max(255).required(),
    model: Joi.string().min(4).max(255).required(),
    category: Joi.objectId().required(),
    year: Joi.number().min(2000).max(2024).required(),
    numberInStock: Joi.number().min(0).max(10).required(),
    monthlyRentalPrice: Joi.number().min(0).max(100).required(),
  });

  return schema.validate(instrument);
}

exports.instrumentSchema = instrumentSchema;
exports.Instrument = Instrument;
exports.validate = validateInstrument;

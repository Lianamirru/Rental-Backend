const Joi = require("joi");
const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        length: 12,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
  },
  dateReturned: {
    type: Date,
    required: true,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Return = mongoose.model("Return", returnSchema);

exports.Return = Return;

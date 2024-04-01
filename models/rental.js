const Joi = require("joi");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
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
  instrument: {
    type: new mongoose.Schema({
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

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    instrumentId: Joi.objectId().required(),
    dateOut: Joi.date().required(),
    dateReturned: Joi.date().required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;

const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    userId: {
      type: Object,
      required: true,
    },
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
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    name: Joi.string().min(1).max(50).required(),
    phone: Joi.string().length(12).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;

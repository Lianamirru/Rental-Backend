const Joi = require("joi");
const mongoose = require("mongoose");
const { instrumentSchema } = require("./instrument");

const cartSchema = new mongoose.Schema({
  instrument: instrumentSchema,
  userId: String,
});

const Cart = mongoose.model("Cart", cartSchema);

function validateCartItem(cartItem) {
  const schema = Joi.object({
    instrumentId: Joi.objectId().required(),
    userId: Joi.objectId().required(),
  });

  return schema.validate(cartItem);
}

exports.cartSchema = cartSchema;
exports.Cart = Cart;
exports.validate = validateCartItem;

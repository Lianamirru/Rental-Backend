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

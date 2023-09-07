const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Customer", customerSchema);

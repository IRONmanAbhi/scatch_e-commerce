const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ecomm");

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  isAdmin: Boolean,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("user", userSchema);

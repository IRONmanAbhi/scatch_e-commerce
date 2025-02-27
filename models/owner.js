const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  picture: Buffer,
  gstin: Number,
});

module.exports = mongoose.model("owner", ownerSchema);

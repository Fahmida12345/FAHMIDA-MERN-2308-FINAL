const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      require: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);

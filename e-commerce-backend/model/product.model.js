const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  images: {
    type: Array,
    require: true,
  },
  sellingPrice: {
    type: Number,
    require: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  hotsell: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("product", productSchema);

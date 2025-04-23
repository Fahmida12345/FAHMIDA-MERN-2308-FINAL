const { default: mongoose } = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("banner", bannerSchema);

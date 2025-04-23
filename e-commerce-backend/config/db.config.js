const mongoose = require("mongoose");
const connectDB = () => {
  try {
    mongoose.connect(process.env.mongoURL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;

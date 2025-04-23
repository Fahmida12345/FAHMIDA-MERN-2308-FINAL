require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors"); //cors origin resource share
const connectDB = require("./config/db.config");
const authRoute = require("./routes/auth.routes");
const categoryRoute = require("./routes/category.routes");
const bannerRoute = require("./routes/banner.routes");
const productRoute = require("./routes/product.routes");
const cartRoute = require("./routes/cart.routes");
const orderRoute = require("./routes/order.routes");
const app = express();
const baseUrl = process.env.base_url;
connectDB();

let port = process.env.port || 8000;

console.log(baseUrl);

//middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static("upload-image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(baseUrl, authRoute); // http://localhost:5000/api/v1/auth
app.use(baseUrl, categoryRoute); // http://localhost:5000/api/v1/category
app.use(baseUrl, bannerRoute); // http://localhost:5000/api/v1/category
app.use(baseUrl, productRoute); // http://localhost:5000/api/v1/ product
app.use(baseUrl, cartRoute); // http://localhost:5000/api/v1/cart
app.use(baseUrl, orderRoute); // http://localhost:5000/api/v1/order

app.get("/", (req, res) => {
  res.status(200).send("hello");
});
app.post("/", (req, res) => {
  res.status(200).send("post route");
});

app.use((req, res) => {
  res.status(404).send({ success: false, msg: "Wrong route" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

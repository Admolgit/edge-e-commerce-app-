const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const router = require("./src/route/routes");
const userRouter = require("./src/route/user");
const categoryRouter = require("./src/route/category");
const productRouter = require("./src/route/product");

dotenv.config();

const app = express();

// This is the middle ware
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// This is the route middle ware
app.use("/", router);
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", productRouter);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => console.log("Connected to Edge MongoDB "))
  .catch((err) => console.log(err.message));

app.listen(PORT, () => console.log(`Edge server running on ${PORT}`));

module.exports = app;

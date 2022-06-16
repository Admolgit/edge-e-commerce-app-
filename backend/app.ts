import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import * as expressValidator from "express-validator";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import router from "./src/route/routes";
import userRouter from "./src/route/user";
import categoryRouter from "./src/route/category";

dotenv.config();

const app = express();

// This is the middle ware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(expressValidator();
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.json());
app.use(cors());

// This is the route middle ware
app.use("/", router);
app.use("/", userRouter);
app.use("/", categoryRouter);


const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URL as string, {})
  .then(() => console.log("Connected to Edge MongoDB "))
  .catch((err) => console.log(err.message));

app.listen(PORT, () => console.log(`Edge server running on ${PORT}`));

export default app;

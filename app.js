const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("../flutterclassAPI/db/conn");
require("../flutterclassAPI/db/conn")
const authRoutes = require("../flutterclassAPI/route/auth");
// const hostelRoutes = require('../flutter API/route/HamroLiquor');
const userRoutes = require("../flutterclassAPI/route/user-route");
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const mongoose = require("mongoose");

//mongodvconfid
dotenv.config();
const app = express();
const port = 4000;

//middleware

//routes
// app.use("/users", userRoutes);
// app.use(notFound)

// app.use(errorHandler)
mongoose.set('strictQuery', true);

mongoose
  .connect("mongodb://127.0.0.1:27017", {})
  .then(() => {
    console.log("connectted to mongodbs server");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Under Construction");
});
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
//checking port
app.listen(port, () => {
  console.log(`App is running in ${port}`);
});

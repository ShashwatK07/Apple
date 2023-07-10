const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const dbUrl = "mongodb://127.0.0.1/apple";
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("\nOH NO ERROR!!!!\n");
    console.log(err);
  });

app.use("/", authRoutes);
app.use("/device", deviceRoutes);
app.use("/user", userRoutes);

app.all("*", (req, res, next) => {
  res.status(404).json({ error: "Page not found!" });
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  res.status(statusCode).json({ error: err.message });
});

app.listen(3010, () => {
  console.log(`Listening Port 3010`);
});

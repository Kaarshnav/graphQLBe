const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongodb = require("mongodb");
const mongoose = require("mongoose");

const Products = require("./dataSource/models/ProductModel");
dotenv.config(); // loading .env into process.env

const PORT = process.env.PORT;
const MONGO_DB_CONNECTION_STRING = process.env.MONGO_URI;
app.use(express.json()); // to use req.body , not body-parser

app.get("/welcome", (req, res) => {
  res.status(200).json({
    data: [
      {
        body: req.body,
      },
    ],
    message: "Hi, Thanks for using our server ",
  });
});
app.get("/getAllData", async (req, res) => {
  const allData = await Products.find({});
  res.json({
    data: allData,
    message: " data fetched succesfully without auth ",
  });
});
mongoose
  .connect(MONGO_DB_CONNECTION_STRING)
  .then(() => {
    console.log(" DB connected successfuly ");
    app.listen(PORT, (req, res) => {
      console.log(`Server is listening at Port ${PORT} ..... `);
    });
  })
  .catch((err) => {
    console.log(`Some error occured while connecting DB ... ${err.message}`);
  });

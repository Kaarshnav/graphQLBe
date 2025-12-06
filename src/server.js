const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");

const Products = require("./dataSource/models/ProductModel");
const RetailRouter = require("./dataSource/routes/retail");
const GuestRouter = require("./dataSource/routes/guest");
dotenv.config(); // loading .env into process.env

const PORT = process.env.PORT;
const MONGO_DB_CONNECTION_STRING = process.env.MONGO_URI;
app.use(express.json()); // to use req.body , not body-parser
app.use("/retail", RetailRouter);
app.use("/guest", GuestRouter);

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

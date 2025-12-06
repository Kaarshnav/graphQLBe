const express = require("express");
const GuestRouter = express.Router();
const Product = require("../models/ProductModel");

GuestRouter.get("/welcome", (req, res) => {
  res.status(200).json({
    data: [
      {
        body: req.body,
      },
    ],
    message: "Hi, Thanks for using our server ",
  });
});
GuestRouter.get("/getAllData", async (req, res) => {
  const allData = await Product.find({});
  res.json({
    data: allData,
    message: " data fetched succesfully without auth ",
  });
});
module.exports = GuestRouter;

const express = require("express");
const RetailRouter = express.Router();
const Product = require("../models/ProductModel");

RetailRouter.post("/products/:productId", async (req, res) => {
  try {
    console.log(" query parms ", req.params.productId);
    console.log(req.body, " -- id body ");
    const productData = await Product.findOne({
      productId: req.params.productId,
    });
    if (!productData) {
      throw new Error("Data not found for that id - internal purpose ");
    }
    res.status(200).json({
      data: productData,
      message: "Data fetched successfuly",
    });
  } catch (err) {
    console.log(" something went wrong => ", err.message);
    res.status(401).json({
      data: null,
      message: " Something went wrong ",
    });
  }
});
RetailRouter.post("/searchProducts", async (req, res) => {
  try {
    console.log(" body value ", req.body);
    // for partial match using regex
    const productData = await Product.find({
      title: { $regex: req.body.searchTerm, $options: "i" },
    });
    if (!productData) {
      throw new Error("Data not found for that id - internal purpose ");
    }
    res.status(200).json({
      data: productData,
      message: "Data fetched successfuly",
    });
  } catch (err) {
    console.log(" something went wrong => ", err.message);
    res.status(401).json({
      data: null,
      message: " Something went wrong ",
    });
  }
});
RetailRouter.post("/addProduct", async (req, res) => {
  try {
    console.log(" body parms ", req.body);
    // not taking any junk data, justwhat we need , will improve that by adding other validn for
    // input santization , right now required check are enought for POC

    const currentProduct = Product({
      productId: req.body.productId,
      title: req.body.title,
      price: req.body.price,
      currency: req.body.currency,
      unit: req.body.unit,
      description: req.body.description,
      proteinContent: req.body.proteinContent,
      totalCalories: req.body.totalCalories,
    });
    await currentProduct.save();
    res.status(200).json({
      data: currentProduct,
      message: "Data Inserted successfuly",
    });
  } catch (err) {
    console.log(" something went wrong => ", err.message);
    res.status(401).json({
      data: null,
      message: " Something went wrong ",
    });
  }
});
module.exports = RetailRouter;

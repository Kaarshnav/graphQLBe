const mongoose = require("mongoose");
const unitEnum = ["kg", "liter", "piece", "packet"];
const ProductSchema = mongoose.Schema(
  {
    productId: {
      // it will actsas forign key for the tore model ,i.e refs in case of no sql
      type: String,
      require: true,
      unique: true,
    },
    title: {
      type: String,
      require: true,
      lowercase: true,
    },
    price: {
      type: Number,
      require: true,
      validate: {
        validator: (value) => value > 0,
        message: "Price must be greater than 0",
      },
    },
    currency: {
      type: String,
      default: "INR",
    },
    unit: {
      type: String,
      enum: unitEnum,
    },
    description: {
      type: String,
      lowercase: true,
    },
    proteinContent: {
      type: Number,
    },
    totalCalories: {
      type: Number,
    },
  },
  { Timestamp: true }
);
const Products = mongoose.model("Product", ProductSchema, "Products"); // coz mongose type cast to lower and plural so  products, but ournameis cap P
module.exports = Products;

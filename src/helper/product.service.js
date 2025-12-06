const Product = require("../dataSource/models/ProductModel");

const searchProductById = async () => {
  const productData = await Product.findOne({
    productId: req.params.productId,
  });
  return productData;
};

const seachProductByTerm = async () => {
  const productData = await Product.find({
    title: { $regex: req.body.searchTerm, $options: "i" },
  });
  return productData;
};

const updateProductById = async (req) => {
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
  return {
    data: currentProduct,
    message: " Product updated succesfully",
  };
};
module.exports = {
  searchProductById,
  seachProductByTerm,
  updateProductById,
};

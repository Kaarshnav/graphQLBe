const Product = require("../dataSource/models/ProductModel");

const searchProductById = async (productId) => {
  const productData = await Product.findOne({
    productId: productId,
  });
  return productData;
};

const seachProductByTerm = async (searchTerm) => {
  const productData = await Product.find({
    title: { $regex: searchTerm, $options: "i" },
  });
  return productData;
};

const updateProductById = async (productId, data) => {
  // Find the existing product
  const existingProduct = await searchProductById(productId);
  if (!existingProduct) {
    throw new Error(`Product with id ${productId} not found`);
  }

  // Merge new data into existing document
  Object.assign(existingProduct, data);

  // Save updated document
  const updatedProduct = await existingProduct.save();

  return {
    data: updatedProduct,
    message: "Product updated successfully",
  };
};
module.exports = {
  searchProductById,
  seachProductByTerm,
  updateProductById,
};

const {
  searchProductById,
  seachProductByTerm,
  updateProductById,
} = require("../helper/product.service");
const productInputValidation = require("./validation/productValidation");

const Query = {
  // Every resolver has this singnature
  //resolver(parent, args, context, info) { ... }
  // our passes data is in args

  product: async (_, { productId }) => {
    return await searchProductById(productId);
  },
  searchProducts: async (_, { searchTerm }) => {
    return await seachProductByTerm(searchTerm || "");
  },
};
const Mutation = {
  updateProduct: async (_, { productId, data }) => {
    // 🔥 Zod validation
    const zodParsedData = productInputValidation.parse(data);
    //
    return await updateProductById(productId, zodParsedData);
  },
};
module.exports = {
  Query,
  Mutation,
};

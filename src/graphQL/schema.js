// input vs
// type xyz ,
// vs type query ,
//  type mutation
// nexus style is also there for ts , like t.nullable.string(title);

// in this style we are defining the schema,
// like it's type and query and mutations
// gql` will convert it further

const typeDefs = `#graphql
  type Product {
    id: ID!
    productId: String!
    title: String!
    price: Float!
    currency: String!
    unit: String
    description: String
    proteinContent: Float
    totalCalories: Float
  }

  input ProductInput {
    productId: String!
    title: String!
    price: Float!
    currency: String!
    unit: String
    description: String
    proteinContent: Float
    totalCalories: Float
  }
  type UpdateProductResponse {
    data: Product!
    message: String!
}
  input UpdateProductReq{
    title: String
    price: Float
    currency: String
    unit: String
    description: String
    proteinContent: Float
    totalCalories: Float
  }

  type Query {
    product(productId: String!): Product
    searchProducts(searchTerm: String!): [Product!]!
  }

  type Mutation {
    addProduct(input: ProductInput!): Product!
    updateProduct(productId: String!, data: UpdateProductReq!): UpdateProductResponse!
  }
`;
module.exports = typeDefs;

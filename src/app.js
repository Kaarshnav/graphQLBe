// server for graphQL
// for rest use server.js

express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");

const { expressMiddleware } = require("@as-integrations/express5");
const { Query, Mutation } = require("./graphQL/resolver");
const typeDefs = require("./graphQL/schema");
dotenv.config(); // loading .env into process.env

const PORT = process.env.PORT;
const MONGO_DB_CONNECTION_STRING = process.env.MONGO_URI;
app.use(express.json()); // to use req.body , not body-parser

const graphQLServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: { Query, Mutation },
});
const startServer = async () => {
  await graphQLServer.start();
  app.use("/graphql", expressMiddleware(graphQLServer));
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
};
startServer();

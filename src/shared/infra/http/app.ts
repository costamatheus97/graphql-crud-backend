import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import "module-alias/register.js";

import "@shared/container";

import { connect } from "@shared/infra/mongoose";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";

connect();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

const startServer = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer();

export { app };

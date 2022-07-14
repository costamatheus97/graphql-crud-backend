import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import "reflect-metadata";

import "@shared/container";

import { connect } from "@shared/infra/mongoose";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";

connect();

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
};

startServer();

export { app };

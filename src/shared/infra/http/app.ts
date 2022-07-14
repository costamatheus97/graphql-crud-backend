import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import "express-async-errors";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";
import { connect } from "@shared/infra/mongoose";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";

connect();

const app = express();

app.use(express.json());
app.use(cors());

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

server.applyMiddleware({ app });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

export { app };

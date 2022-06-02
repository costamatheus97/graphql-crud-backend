import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import "express-async-errors";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";
import routes from "@shared/infra/http/routes";
import { connect } from "@shared/infra/mongoose";

connect();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

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

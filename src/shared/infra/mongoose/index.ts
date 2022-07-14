import "dotenv/config";

import mongoose, { Mongoose } from "mongoose";

const MONGO_URI =
  process.env.NODE_ENV === "development"
    ? "mongodb://bookstoreadmin:admin@database:27017/"
    : process.env.MONGO_URI_PRODUCTION;

export const connect = async (): Promise<Mongoose> =>
  mongoose.connect(MONGO_URI as string);

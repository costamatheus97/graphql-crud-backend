import mongoose, { Schema } from "mongoose";

import { IBook } from "../entities/Book";

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  cover: { type: String, required: true },
});

export default mongoose.model<IBook>("Book", BookSchema);

import { Document } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  price: number;
  cover: string;
}

export { IBook };

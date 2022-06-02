import { Document } from "mongoose";

interface IQuestion extends Document {
  question: string;
  answer: boolean;
  value: number;
}

export { IQuestion };

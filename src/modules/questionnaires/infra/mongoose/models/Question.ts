import mongoose, { Schema } from "mongoose";

import { IQuestion } from "../entities/Question";

const QuestionSchema: Schema = new Schema({
  question: { type: String, required: true },
  answer: { type: Boolean, required: true },
  value: { type: Number, required: true },
});

export default mongoose.model<IQuestion>("Question", QuestionSchema);

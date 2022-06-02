import mongoose, { Schema } from "mongoose";

import { IQuestionnaire } from "../entities/Questionnaire";
import QuestionSchema from "./Question";

const QuestionnaireSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: {
      type: [QuestionSchema.schema],
      required: true,
    },
    createdAt: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IQuestionnaire>(
  "Questionnaire",
  QuestionnaireSchema
);

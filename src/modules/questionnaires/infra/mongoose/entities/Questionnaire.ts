import { Document } from "mongoose";

import { IQuestion } from "./Question";

interface IQuestionnaire extends Document {
  id: string;
  title: string;
  questions: IQuestion[];
}

export { IQuestionnaire };

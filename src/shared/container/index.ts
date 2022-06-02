import { container } from "tsyringe";

import { QuestionnaireRepository } from "@modules/questionnaires/infra/mongoose/repositories/QuestionnaireRepository";
import { IQuestionnaireRepository } from "@modules/questionnaires/repositories/IQuestionaireRepository";

container.registerSingleton<IQuestionnaireRepository>(
  "QuestionnaireRepository",
  QuestionnaireRepository
);

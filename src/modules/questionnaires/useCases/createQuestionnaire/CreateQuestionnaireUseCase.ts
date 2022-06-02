import { injectable, inject } from "tsyringe";

import { ICreateQuestionaireDTO } from "@modules/questionnaires/dtos/ICreateQuestionnaireDTO";
import { IQuestionnaire } from "@modules/questionnaires/infra/mongoose/entities/Questionnaire";
import { IQuestionnaireRepository } from "@modules/questionnaires/repositories/IQuestionaireRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateQuestionnaireUseCase {
  constructor(
    @inject("QuestionnaireRepository")
    private questionnaireRepository: IQuestionnaireRepository
  ) {}

  async execute({
    title,
    questions,
  }: ICreateQuestionaireDTO): Promise<IQuestionnaire> {
    if (!questions?.length) {
      throw new AppError("You need to create at least one question");
    }

    const values = questions.map((question) => question.value);

    if (values.some((value) => value < 0.25 || value > 1)) {
      throw new AppError("Values should be between 0.25 and 1");
    }

    const questionnaire =
      await this.questionnaireRepository.createQuestionnaire({
        title,
        questions,
      });

    return questionnaire;
  }
}

export { CreateQuestionnaireUseCase };

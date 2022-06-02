import { injectable, inject } from "tsyringe";

import { IUpdateQuestionnaireDTO } from "@modules/questionnaires/dtos/IUpdateQuestionnaireDTO";
import { IQuestionnaire } from "@modules/questionnaires/infra/mongoose/entities/Questionnaire";
import { IQuestionnaireRepository } from "@modules/questionnaires/repositories/IQuestionaireRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateQuestionnaireUseCase {
  constructor(
    @inject("QuestionnaireRepository")
    private questionnaireRepository: IQuestionnaireRepository
  ) {}

  async execute(
    id: string,
    data: IUpdateQuestionnaireDTO
  ): Promise<IQuestionnaire> {
    const questionnaire =
      await this.questionnaireRepository.findQuestionnaireById(id);

    if (!questionnaire) {
      throw new AppError("Questionnaire not found");
    }

    const updatedQuestionnaire =
      await this.questionnaireRepository.updateQuestionnaire(id, data);

    return updatedQuestionnaire;
  }
}

export { UpdateQuestionnaireUseCase };

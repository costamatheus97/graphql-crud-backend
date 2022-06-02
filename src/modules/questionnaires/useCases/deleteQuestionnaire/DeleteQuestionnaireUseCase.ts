import { injectable, inject } from "tsyringe";

import { IQuestionnaireRepository } from "@modules/questionnaires/repositories/IQuestionaireRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteQuestionnaireUseCase {
  constructor(
    @inject("QuestionnaireRepository")
    private questionnaireRepository: IQuestionnaireRepository
  ) {}

  async execute(id: string): Promise<void> {
    const questionnaire =
      await this.questionnaireRepository.findQuestionnaireById(id);

    if (!questionnaire) {
      throw new AppError("Questionnaire not found");
    }

    await this.questionnaireRepository.deleteQuestionnaireById(id);
  }
}

export { DeleteQuestionnaireUseCase };

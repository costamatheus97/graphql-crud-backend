import { injectable, inject } from "tsyringe";

import { IQuestionnaire } from "@modules/questionnaires/infra/mongoose/entities/Questionnaire";
import { IQuestionnaireRepository } from "@modules/questionnaires/repositories/IQuestionaireRepository";

@injectable()
class ListQuestionnairesByIdUseCase {
  constructor(
    @inject("QuestionnaireRepository")
    private questionnairesRepository: IQuestionnaireRepository
  ) {}

  async execute(id: string): Promise<IQuestionnaire> {
    const questionnaire =
      await this.questionnairesRepository.findQuestionnaireById(id);

    return questionnaire;
  }
}

export { ListQuestionnairesByIdUseCase };

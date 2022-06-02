import { injectable, inject } from "tsyringe";

import { IQuestionnaire } from "@modules/questionnaires/infra/mongoose/entities/Questionnaire";
import { IQuestionnaireRepository } from "@modules/questionnaires/repositories/IQuestionaireRepository";

@injectable()
class ListQuestionnairesUseCase {
  constructor(
    @inject("QuestionnaireRepository")
    private questionnairesRepository: IQuestionnaireRepository
  ) {}

  async execute(): Promise<IQuestionnaire[]> {
    const questionnaires = await this.questionnairesRepository.findAll();

    return questionnaires;
  }
}

export { ListQuestionnairesUseCase };

import { ICreateQuestionaireDTO } from "../dtos/ICreateQuestionnaireDTO";
import { IUpdateQuestionnaireDTO } from "../dtos/IUpdateQuestionnaireDTO";
import { IQuestionnaire } from "../infra/mongoose/entities/Questionnaire";

interface IQuestionnaireRepository {
  findAll(): Promise<IQuestionnaire[]>;
  deleteQuestionnaireById(id: string): Promise<void>;
  findQuestionnaireById(id: string): Promise<IQuestionnaire>;
  createQuestionnaire(data: ICreateQuestionaireDTO): Promise<IQuestionnaire>;
  updateQuestionnaire(
    id: string,
    data: IUpdateQuestionnaireDTO
  ): Promise<IQuestionnaire>;
  findByTitle(title: string): Promise<IQuestionnaire>;
}

export { IQuestionnaireRepository };

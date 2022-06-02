/* eslint-disable no-underscore-dangle */
import { ICreateQuestionaireDTO } from "@modules/questionnaires/dtos/ICreateQuestionnaireDTO";
import { IUpdateQuestionnaireDTO } from "@modules/questionnaires/dtos/IUpdateQuestionnaireDTO";
import { IQuestionnaire } from "@modules/questionnaires/infra/mongoose/entities/Questionnaire";
import Questionnaire from "@modules/questionnaires/infra/mongoose/models/Questionnaire";

import { IQuestionnaireRepository } from "../IQuestionaireRepository";

class QuestionnaireRepositoryInMemory implements IQuestionnaireRepository {
  questionnaires: IQuestionnaire[] = [];

  async deleteQuestionnaireById(id: string): Promise<void> {
    const updatedQuestionnaires = this.questionnaires.filter(
      (questionnaire) => questionnaire._id !== id
    );

    this.questionnaires = updatedQuestionnaires;
  }

  async findAll(): Promise<IQuestionnaire[]> {
    return this.questionnaires;
  }

  async findQuestionnaireById(id: string): Promise<IQuestionnaire> {
    return this.questionnaires.find(
      (questionnaire) => questionnaire._id === id
    );
  }

  async createQuestionnaire({
    title,
    questions,
  }: ICreateQuestionaireDTO): Promise<IQuestionnaire> {
    const questionnaire = new Questionnaire({
      title,
      questions,
    });

    this.questionnaires.push(questionnaire);

    return questionnaire;
  }

  async updateQuestionnaire(
    id: string,
    data: IUpdateQuestionnaireDTO
  ): Promise<IQuestionnaire> {
    const questionnaireIndex = this.questionnaires.findIndex(
      (questionnaire) => questionnaire._id === id
    );
    const questionnaire = this.questionnaires[questionnaireIndex];

    Object.assign(questionnaire, data);

    this.questionnaires[questionnaireIndex] = questionnaire;

    return questionnaire;
  }

  async findByTitle(title: string): Promise<IQuestionnaire> {
    return this.questionnaires.find(
      (questionnaire) => questionnaire.title === title
    );
  }
}

export { QuestionnaireRepositoryInMemory };

import { ICreateQuestionaireDTO } from "@modules/questionnaires/dtos/ICreateQuestionnaireDTO";
import { IUpdateQuestionnaireDTO } from "@modules/questionnaires/dtos/IUpdateQuestionnaireDTO";
import { IQuestionnaire } from "@modules/questionnaires/infra/mongoose/entities/Questionnaire";
import { IQuestionnaireRepository } from "@modules/questionnaires/repositories/IQuestionaireRepository";

import Questionnaire from "../models/Questionnaire";

class QuestionnaireRepository implements IQuestionnaireRepository {
  async deleteQuestionnaireById(id: string): Promise<void> {
    await Questionnaire.deleteOne({ _id: id });
  }

  async findAll(): Promise<IQuestionnaire[]> {
    const questionnaires = await Questionnaire.find();

    return questionnaires;
  }

  async findQuestionnaireById(id: string): Promise<IQuestionnaire> {
    const questionnaire = await Questionnaire.findById(id);

    return questionnaire;
  }

  async createQuestionnaire({
    title,
    questions,
  }: ICreateQuestionaireDTO): Promise<IQuestionnaire> {
    const questionnaire = new Questionnaire({
      title,
      questions,
    });

    await questionnaire.save();

    return questionnaire;
  }

  async updateQuestionnaire(
    id: string,
    data: IUpdateQuestionnaireDTO
  ): Promise<IQuestionnaire> {
    const questionnaire = await Questionnaire.findOneAndUpdate(
      { _id: id },
      data
    );

    return questionnaire;
  }

  async findByTitle(title: string): Promise<IQuestionnaire> {
    const questionnaire = await Questionnaire.findOne({ title });

    return questionnaire;
  }
}

export { QuestionnaireRepository };

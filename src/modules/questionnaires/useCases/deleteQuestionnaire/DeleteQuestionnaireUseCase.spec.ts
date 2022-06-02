/* eslint-disable no-underscore-dangle */
import "reflect-metadata";

import { QuestionnaireRepositoryInMemory } from "@modules/questionnaires/repositories/in-memory/QuestionaireRepositoryInMemory";

import { CreateQuestionnaireUseCase } from "../createQuestionnaire/CreateQuestionnaireUseCase";
import { DeleteQuestionnaireUseCase } from "./DeleteQuestionnaireUseCase";

let deleteQuestionnaireUseCase: DeleteQuestionnaireUseCase;
let createQuestionnaireUseCase: CreateQuestionnaireUseCase;
let questionnaireRepositoryInMemory: QuestionnaireRepositoryInMemory;

describe("Delete Questionnaire", () => {
  beforeEach(() => {
    questionnaireRepositoryInMemory = new QuestionnaireRepositoryInMemory();

    createQuestionnaireUseCase = new CreateQuestionnaireUseCase(
      questionnaireRepositoryInMemory
    );
    deleteQuestionnaireUseCase = new DeleteQuestionnaireUseCase(
      questionnaireRepositoryInMemory
    );
  });

  it("should be able to delete a questionnaire", async () => {
    const questionnaire = await createQuestionnaireUseCase.execute({
      title: "Covid-19",
      questions: [
        {
          question: "Do you have fever?",
          answer: true,
          value: 1,
        },
      ],
    });

    await deleteQuestionnaireUseCase.execute(questionnaire._id);

    const questionnaires = await questionnaireRepositoryInMemory.findAll();

    expect(questionnaires.length).toBe(0);
  });
});

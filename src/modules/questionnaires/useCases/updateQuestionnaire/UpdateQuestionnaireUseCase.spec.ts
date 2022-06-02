/* eslint-disable no-underscore-dangle */
import "reflect-metadata";

import { QuestionnaireRepositoryInMemory } from "@modules/questionnaires/repositories/in-memory/QuestionaireRepositoryInMemory";

import { CreateQuestionnaireUseCase } from "../createQuestionnaire/CreateQuestionnaireUseCase";
import { UpdateQuestionnaireUseCase } from "./UpdateQuestionnaireUseCase";

let updateQuestionnaireUseCase: UpdateQuestionnaireUseCase;

let createQuestionnaireUseCase: CreateQuestionnaireUseCase;

let questionnaireRepositoryInMemory: QuestionnaireRepositoryInMemory;

describe("Update Questionnaire", () => {
  beforeEach(() => {
    questionnaireRepositoryInMemory = new QuestionnaireRepositoryInMemory();

    createQuestionnaireUseCase = new CreateQuestionnaireUseCase(
      questionnaireRepositoryInMemory
    );

    updateQuestionnaireUseCase = new UpdateQuestionnaireUseCase(
      questionnaireRepositoryInMemory
    );
  });

  it("should be able to update a questionnaire", async () => {
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

    await updateQuestionnaireUseCase.execute(questionnaire._id, {
      title: "Malaria",
      questions: [
        {
          question: "Do you have fever?",
          answer: true,
          value: 1,
        },
      ],
    });

    const questionnaires = await questionnaireRepositoryInMemory.findAll();

    expect(questionnaires[0].title).toBe("Malaria");
  });
});

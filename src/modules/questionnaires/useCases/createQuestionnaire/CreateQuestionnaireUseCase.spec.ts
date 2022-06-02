import "reflect-metadata";
import { QuestionnaireRepositoryInMemory } from "@modules/questionnaires/repositories/in-memory/QuestionaireRepositoryInMemory";

import { CreateQuestionnaireUseCase } from "./CreateQuestionnaireUseCase";

let createQuestionnaireUseCase: CreateQuestionnaireUseCase;

let questionnaireRepositoryInMemory: QuestionnaireRepositoryInMemory;

describe("Create Questionnaire", () => {
  beforeEach(() => {
    questionnaireRepositoryInMemory = new QuestionnaireRepositoryInMemory();

    createQuestionnaireUseCase = new CreateQuestionnaireUseCase(
      questionnaireRepositoryInMemory
    );
  });

  it("should be able to create a new questionnaire", async () => {
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

    expect(questionnaire).toHaveProperty("_id");
    expect(questionnaire).toHaveProperty("title");
    expect(questionnaire).toHaveProperty("questions");
    expect(questionnaire.questions.length).toBe(1);
  });
});

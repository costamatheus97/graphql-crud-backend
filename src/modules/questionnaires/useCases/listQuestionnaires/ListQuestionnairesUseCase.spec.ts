import "reflect-metadata";
import { QuestionnaireRepositoryInMemory } from "@modules/questionnaires/repositories/in-memory/QuestionaireRepositoryInMemory";

import { CreateQuestionnaireUseCase } from "../createQuestionnaire/CreateQuestionnaireUseCase";
import { ListQuestionnairesUseCase } from "./ListQuestionnairesUseCase";

let createQuestionnaireUseCase: CreateQuestionnaireUseCase;
let listQuestionnairesUseCase: ListQuestionnairesUseCase;

let questionnaireRepositoryInMemory: QuestionnaireRepositoryInMemory;

describe("List Questionnaire", () => {
  beforeEach(() => {
    questionnaireRepositoryInMemory = new QuestionnaireRepositoryInMemory();

    createQuestionnaireUseCase = new CreateQuestionnaireUseCase(
      questionnaireRepositoryInMemory
    );
    listQuestionnairesUseCase = new ListQuestionnairesUseCase(
      questionnaireRepositoryInMemory
    );
  });

  it("should be able to list questionnaires", async () => {
    await createQuestionnaireUseCase.execute({
      title: "Covid-19",
      questions: [
        {
          question: "Do you have fever?",
          answer: true,
          value: 1,
        },
      ],
    });

    await createQuestionnaireUseCase.execute({
      title: "Malaria",
      questions: [
        {
          question: "Do you have fever?",
          answer: true,
          value: 1,
        },
      ],
    });

    const questionnaires = await listQuestionnairesUseCase.execute();

    expect(questionnaires.length).toBe(2);
  });
});

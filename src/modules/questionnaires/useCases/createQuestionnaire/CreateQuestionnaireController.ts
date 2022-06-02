import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateQuestionnaireUseCase } from "./CreateQuestionnaireUseCase";

class CreateQuestionnaireController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { title, questions } = req.body;

    const createQuestionnaireUseCase = container.resolve(
      CreateQuestionnaireUseCase
    );

    const questionnaire = await createQuestionnaireUseCase.execute({
      title,
      questions,
    });

    return res.status(201).json(questionnaire);
  }
}

export { CreateQuestionnaireController };

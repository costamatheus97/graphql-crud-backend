import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListQuestionnairesByIdUseCase } from "./ListQuestionnairesByIdUseCase";

class ListQuestionnairesByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const listQuestionnairesByIdUseCase = container.resolve(
      ListQuestionnairesByIdUseCase
    );

    const questionnaires = await listQuestionnairesByIdUseCase.execute(id);

    return res.status(200).json(questionnaires);
  }
}

export { ListQuestionnairesByIdController };

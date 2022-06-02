import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteQuestionnaireUseCase } from "./DeleteQuestionnaireUseCase";

class DeleteQuestionnaireController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteQuestionnaireUseCase = container.resolve(
      DeleteQuestionnaireUseCase
    );

    await deleteQuestionnaireUseCase.execute(id);

    return res.status(204).send();
  }
}

export { DeleteQuestionnaireController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateQuestionnaireUseCase } from "./UpdateQuestionnaireUseCase";

class UpdateQuestionnaireController {
  async handle(req: Request, res: Response): Promise<Response> {
    const payload = req.body;
    const { id } = req.params;

    const UpdateCarUseCase = container.resolve(UpdateQuestionnaireUseCase);

    const UpdatedExam = await UpdateCarUseCase.execute(id, payload);

    return res.status(200).json(UpdatedExam);
  }
}

export { UpdateQuestionnaireController };

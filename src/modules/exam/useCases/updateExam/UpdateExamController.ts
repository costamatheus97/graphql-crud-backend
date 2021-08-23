import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateExamUseCase } from "./UpdateExamUseCase";

class UpdateExamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const payload = req.body;

    const UpdateCarUseCase = container.resolve(UpdateExamUseCase);

    const UpdatedExam = await UpdateCarUseCase.execute(payload);

    return res.status(201).json(UpdatedExam);
  }
}

export { UpdateExamController };

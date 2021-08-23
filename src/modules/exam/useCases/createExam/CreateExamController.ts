import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateExamUseCase } from "./CreateExamUseCase";

class CreateExamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      species,
      gender,
      race,
      age,
      exam_region,
      projection,
      history,
      clinic_suspect,
      x_ray,
      priority,
      clinic_id,
      veterinarian_id,
    } = req.body;

    const createCarUseCase = container.resolve(CreateExamUseCase);

    const createdExam = await createCarUseCase.execute({
      name,
      species,
      gender,
      race,
      age,
      exam_region,
      projection,
      history,
      clinic_suspect,
      x_ray,
      priority,
      clinic_id,
      veterinarian_id,
    });

    return res.status(201).json(createdExam);
  }
}

export { CreateExamController };

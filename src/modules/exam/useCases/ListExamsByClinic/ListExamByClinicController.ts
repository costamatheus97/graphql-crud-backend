import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListExamByClinic } from "./ListExamByClinicUseCase";

class ListExamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: clinic_id } = req.params;
    const { veterinarian: veterinarian_id } = req.query;

    const listExamByClinicUseCase = container.resolve(ListExamByClinic);

    const exams = await listExamByClinicUseCase.execute({
      clinic_id,
      veterinarian_id: veterinarian_id.toString(),
    });

    return res.status(200).json(exams);
  }
}

export { ListExamController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListVeterinarianByClinic } from "./ListVeterinarianByClinicUseCase";

class ListVeterinarianController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: clinic_id } = req.params;

    const listExamByClinicUseCase = container.resolve(ListVeterinarianByClinic);

    const veterinarians = await listExamByClinicUseCase.execute({
      clinic_id,
    });

    return res.status(200).json(veterinarians);
  }
}

export { ListVeterinarianController };

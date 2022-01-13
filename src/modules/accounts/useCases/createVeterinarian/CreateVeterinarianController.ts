import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateVeterinarianUseCase } from "./CreateVeterinarianUseCase";

class CreateVeterinarianController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, crmv, clinic_id } = req.body;
    const createVeterinarianUseCase = container.resolve(
      CreateVeterinarianUseCase
    );

    await createVeterinarianUseCase.execute({
      name,
      crmv,
      clinic_id,
    });

    return res.status(201).send();
  }
}

export { CreateVeterinarianController };

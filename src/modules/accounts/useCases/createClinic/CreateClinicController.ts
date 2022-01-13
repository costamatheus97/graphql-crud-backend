import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateClinicUseCase } from "./CreateClinicUseCase";

class CreateClinicController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      address,
      cnpj,
      owner_crmv,
      owner_name,
      phone,
    } = req.body;
    const createClinicUseCase = container.resolve(CreateClinicUseCase);

    await createClinicUseCase.execute({
      name,
      email,
      password,
      address,
      cnpj,
      owner_crmv,
      owner_name,
      phone,
    });

    return res.status(201).send();
  }
}

export { CreateClinicController };

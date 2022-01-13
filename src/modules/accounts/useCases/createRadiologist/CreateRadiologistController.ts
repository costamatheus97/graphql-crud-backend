import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRadiologistUseCase } from "./CreateRadiologistUseCase";

class CreateRadiologistController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, crmv, description, avatar } = req.body;
    const createRadiologistUseCase = container.resolve(
      CreateRadiologistUseCase
    );

    await createRadiologistUseCase.execute({
      name,
      email,
      password,
      crmv,
      description,
      avatar,
    });

    return res.status(201).send();
  }
}

export { CreateRadiologistController };

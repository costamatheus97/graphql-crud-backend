import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateRadiologistUseCase } from "./AuthenticateRadiologistUseCase";

class AuthenticateRadiologistController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const authenticateRadiologistUseCase = container.resolve(
      AuthenticateRadiologistUseCase
    );

    const authenticateInfo = await authenticateRadiologistUseCase.execute({
      email,
      password,
    });

    return res.json(authenticateInfo);
  }
}

export { AuthenticateRadiologistController };

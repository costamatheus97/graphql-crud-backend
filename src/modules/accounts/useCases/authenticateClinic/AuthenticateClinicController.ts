import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateClinicUseCase } from "./AuthenticateClinicUseCase";

class AuthenticateClinicController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const authenticateClinicUseCase = container.resolve(
      AuthenticateClinicUseCase
    );

    const authenticateInfo = await authenticateClinicUseCase.execute({
      email,
      password,
    });

    return res.json(authenticateInfo);
  }
}

export { AuthenticateClinicController };

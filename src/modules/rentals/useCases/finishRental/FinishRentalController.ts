import { Request, Response } from "express";
import { container } from "tsyringe";

import { FinishRentalUseCase } from "./FinishRentalUseCase";

class FinishRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id } = req.params;

    const finishRentalUseCase = container.resolve(FinishRentalUseCase);
    const rental = await finishRentalUseCase.execute({
      id,
      user_id,
    });

    return res.status(200).json(rental);
  }
}

export { FinishRentalController };

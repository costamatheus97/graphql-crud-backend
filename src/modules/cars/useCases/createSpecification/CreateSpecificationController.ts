import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    const specification = createSpecificationUseCase.execute({
      name,
      description,
    });

    return res.json(specification);
  }
}

export { CreateSpecificationController };

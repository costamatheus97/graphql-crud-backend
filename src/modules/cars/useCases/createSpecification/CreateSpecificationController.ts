import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;
    const specification = this.createSpecificationUseCase.execute({
      name,
      description,
    });

    return res.json(specification);
  }
}

export { CreateSpecificationController };

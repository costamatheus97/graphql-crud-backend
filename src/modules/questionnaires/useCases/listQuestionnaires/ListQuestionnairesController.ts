import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListQuestionnairesUseCase } from "./ListQuestionnairesUseCase";

class ListQuestionnairesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listQuestionnairesUseCase = container.resolve(
      ListQuestionnairesUseCase
    );

    const questionnaires = await listQuestionnairesUseCase.execute();

    return res.status(200).json(questionnaires);
  }
}

export { ListQuestionnairesController };

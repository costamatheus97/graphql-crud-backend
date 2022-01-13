import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateRadiologistAvatarUseCase } from "./UpdateRadiologistAvatarUseCase";

class UpdateRadiologistAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatar_file = req.file.filename;

    const updateRadiologistAvatarUseCase = container.resolve(
      UpdateRadiologistAvatarUseCase
    );

    updateRadiologistAvatarUseCase.execute({ radiologist_id: id, avatar_file });

    return res.status(204).send();
  }
}

export { UpdateRadiologistAvatarController };

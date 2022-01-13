import { Request, Response, NextFunction } from "express";

import { RadiologistsRepository } from "@modules/accounts/infra/typeorm/repositories/RadiologistsRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureIsAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;
  const radiologistsRepository = new RadiologistsRepository();

  const radiologist = await radiologistsRepository.findById(id);

  if (!radiologist) {
    throw new AppError("User is not admin");
  }

  return next();
}

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { ClinicsRepository } from "@modules/accounts/infra/typeorm/repositories/ClinicsRepository";
import { RadiologistsRepository } from "@modules/accounts/infra/typeorm/repositories/RadiologistsRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "95df1a5b8e82f63a91756748da96e028"
    ) as IPayload;

    const clinicsRepository = new ClinicsRepository();
    const radiologistsRepository = new RadiologistsRepository();

    const radiologist = clinicsRepository.findById(user_id);
    const clinic = radiologistsRepository.findById(user_id);

    if (!radiologist && !clinic) {
      throw new AppError("User does not exist");
    }

    req.user = {
      id: user_id,
      role: radiologist ? "radiologist" : "clinic",
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token");
  }
}

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import { IClinicsRepository } from "@modules/accounts/repositories/IClinicsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateClinicUseCase {
  constructor(
    @inject("ClinicsRepository")
    private clinicsRepository: IClinicsRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByEmail(email);

    if (!clinic) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, clinic.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "95df1a5b8e82f63a91756748da96e028", {
      subject: clinic.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: clinic.name,
        email: clinic.email,
      },
    };
    return tokenReturn;
  }
}

export { AuthenticateClinicUseCase };

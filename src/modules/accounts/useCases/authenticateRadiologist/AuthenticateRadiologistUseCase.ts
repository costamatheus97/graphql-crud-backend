import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import { IRadiologistsRepository } from "@modules/accounts/repositories/IRadiologistsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  radiologist: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateRadiologistUseCase {
  constructor(
    @inject("RadiologistsRepository")
    private radiologistsRepository: IRadiologistsRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const radiologist = await this.radiologistsRepository.findByEmail(email);

    if (!radiologist) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, radiologist.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }
    const token = sign({}, "95df1a5b8e82f63a91756748da96e028", {
      subject: radiologist.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      radiologist: {
        name: radiologist.name,
        email: radiologist.email,
      },
    };
    return tokenReturn;
  }
}

export { AuthenticateRadiologistUseCase };

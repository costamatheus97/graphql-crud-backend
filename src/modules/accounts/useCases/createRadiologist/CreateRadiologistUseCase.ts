import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateRadiologistDTO } from "@modules/accounts/dtos/ICreateRadiologistDTO";
import { IRadiologistsRepository } from "@modules/accounts/repositories/IRadiologistsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateRadiologistUseCase {
  constructor(
    @inject("RadiologistsRepository")
    private radiologistsRepository: IRadiologistsRepository
  ) {}
  async execute({
    name,
    email,
    password,
    crmv,
    description,
    avatar,
  }: ICreateRadiologistDTO): Promise<void> {
    const userAlreadyExists = await this.radiologistsRepository.findByEmail(
      email
    );

    if (userAlreadyExists) {
      throw new AppError("Radiologist already exists");
    }

    const hashedPassword = await hash(password, 8);

    await this.radiologistsRepository.create({
      name,
      email,
      password: hashedPassword,
      crmv,
      description,
      avatar,
    });
  }
}

export { CreateRadiologistUseCase };

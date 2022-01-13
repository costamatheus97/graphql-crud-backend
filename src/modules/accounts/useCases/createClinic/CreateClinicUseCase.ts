import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateClinicDTO } from "@modules/accounts/dtos/ICreateClinicDTO";
import { IClinicsRepository } from "@modules/accounts/repositories/IClinicsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateClinicUseCase {
  constructor(
    @inject("ClinicsRepository")
    private clinicsRepository: IClinicsRepository
  ) {}
  async execute({
    name,
    email,
    password,
    address,
    cnpj,
    owner_crmv,
    owner_name,
    phone,
  }: ICreateClinicDTO): Promise<void> {
    const clinicAlreadyExists = await this.clinicsRepository.findByEmail(email);

    if (clinicAlreadyExists) {
      throw new AppError("Clinic already exists");
    }

    const hashedPassword = await hash(password, 8);

    await this.clinicsRepository.create({
      name,
      email,
      password: hashedPassword,
      address,
      cnpj,
      owner_crmv,
      owner_name,
      phone,
    });
  }
}

export { CreateClinicUseCase };

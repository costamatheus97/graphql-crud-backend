import { inject, injectable } from "tsyringe";

import { ICreateVeterinarianDTO } from "@modules/accounts/dtos/ICreateVeterinarianDTO";
import { IVeterinariansRepository } from "@modules/accounts/repositories/IVeterinariansRepository";

@injectable()
class CreateVeterinarianUseCase {
  constructor(
    @inject("VeterinariansRepository")
    private veterinariansRepository: IVeterinariansRepository
  ) {}
  async execute({
    name,
    crmv,
    clinic_id,
  }: ICreateVeterinarianDTO): Promise<void> {
    await this.veterinariansRepository.create({
      name,
      crmv,
      clinic_id,
    });
  }
}

export { CreateVeterinarianUseCase };

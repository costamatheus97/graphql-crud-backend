import { Repository, getRepository } from "typeorm";

import { ICreateVeterinarianDTO } from "@modules/accounts/dtos/ICreateVeterinarianDTO";
import { Veterinarian } from "@modules/accounts/infra/typeorm/entities/Veterinarians";
import { IVeterinariansRepository } from "@modules/accounts/repositories/IVeterinariansRepository";

class UsersRepository implements IVeterinariansRepository {
  private repository: Repository<Veterinarian>;

  constructor() {
    this.repository = getRepository(Veterinarian);
  }
  async create({
    name,
    crmv,
    clinic_id,
    id,
  }: ICreateVeterinarianDTO): Promise<void> {
    const veterinarian = this.repository.create({
      name,
      crmv,
      clinic_id,
      id,
    });

    await this.repository.save(veterinarian);
  }

  async findByEmail(email: string): Promise<Veterinarian> {
    const selectedVeterinarian = await this.repository.findOne({
      where: { email },
    });

    return selectedVeterinarian;
  }

  async findById(id: string): Promise<Veterinarian> {
    const selectedVeterinarian = await this.repository.findOne({
      where: { id },
    });

    return selectedVeterinarian;
  }
}

export { UsersRepository };

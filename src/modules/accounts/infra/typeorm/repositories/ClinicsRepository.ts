import { Repository, getRepository } from "typeorm";

import { ICreateClinicDTO } from "@modules/accounts/dtos/ICreateClinicDTO";
import { Clinic } from "@modules/accounts/infra/typeorm/entities/Clinic";
import { IClinicsRepository } from "@modules/accounts/repositories/IClinicsRepository";

class ClinicsRepository implements IClinicsRepository {
  private repository: Repository<Clinic>;

  constructor() {
    this.repository = getRepository(Clinic);
  }
  async create({
    name,
    email,
    password,
    address,
    cnpj,
    owner_crmv,
    owner_name,
    phone,
    id,
  }: ICreateClinicDTO): Promise<void> {
    const clinic = this.repository.create({
      name,
      email,
      password,
      address,
      cnpj,
      owner_crmv,
      owner_name,
      phone,
      id,
    });

    await this.repository.save(clinic);
  }

  async findByEmail(email: string): Promise<Clinic> {
    const selectedClinic = await this.repository.findOne({ where: { email } });

    return selectedClinic;
  }

  async findById(id: string): Promise<Clinic> {
    const selectedClinic = await this.repository.findOne({
      where: { id },
      relations: ["exams"],
    });

    return selectedClinic;
  }
}

export { ClinicsRepository };

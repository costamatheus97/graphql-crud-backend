import { Repository, getRepository } from "typeorm";

import { ICreateRadiologistDTO } from "@modules/accounts/dtos/ICreateRadiologistDTO";
import { Radiologist } from "@modules/accounts/infra/typeorm/entities/Radiologist";
import { IRadiologistsRepository } from "@modules/accounts/repositories/IRadiologistsRepository";

class UsersRepository implements IRadiologistsRepository {
  private repository: Repository<Radiologist>;

  constructor() {
    this.repository = getRepository(Radiologist);
  }
  async create({
    name,
    email,
    password,
    crmv,
    description,
    avatar,
    id,
  }: ICreateRadiologistDTO): Promise<void> {
    const radiologist = this.repository.create({
      name,
      email,
      password,
      crmv,
      description,
      avatar,
      id,
    });

    await this.repository.save(radiologist);
  }

  async findByEmail(email: string): Promise<Radiologist> {
    const selectedRadiologist = await this.repository.findOne({
      where: { email },
    });

    return selectedRadiologist;
  }

  async findById(id: string): Promise<Radiologist> {
    const selectedRadiologist = await this.repository.findOne({
      where: { id },
    });

    return selectedRadiologist;
  }
}

export { UsersRepository };

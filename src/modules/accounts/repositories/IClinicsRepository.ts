import { ICreateClinicDTO } from "@modules/accounts/dtos/ICreateClinicDTO";
import { Clinic } from "@modules/accounts/infra/typeorm/entities/Clinic";

interface IClinicsRepository {
  create(data: ICreateClinicDTO): Promise<void>;
  findByEmail(email: string): Promise<Clinic>;
  findById(id: string): Promise<Clinic>;
}

export { IClinicsRepository };

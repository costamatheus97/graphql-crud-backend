import { ICreateRadiologistDTO } from "@modules/accounts/dtos/ICreateRadiologistDTO";
import { Radiologist } from "@modules/accounts/infra/typeorm/entities/Radiologist";

interface IRadiologistsRepository {
  create(data: ICreateRadiologistDTO): Promise<void>;
  findByEmail(email: string): Promise<Radiologist>;
  findById(id: string): Promise<Radiologist>;
}

export { IRadiologistsRepository };

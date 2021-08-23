import { ICreateVeterinarianDTO } from "@modules/accounts/dtos/ICreateVeterinarianDTO";
import { Veterinarian } from "@modules/accounts/infra/typeorm/entities/Veterinarians";

interface IVeterinariansRepository {
  create(data: ICreateVeterinarianDTO): Promise<void>;
  findByEmail(email: string): Promise<Veterinarian>;
  findById(id: string): Promise<Veterinarian>;
}

export { IVeterinariansRepository };

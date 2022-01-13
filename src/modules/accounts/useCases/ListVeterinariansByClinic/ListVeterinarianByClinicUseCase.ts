import { injectable, inject } from "tsyringe";

import { Veterinarian } from "@modules/accounts/infra/typeorm/entities/Veterinarians";
import { IVeterinariansRepository } from "@modules/accounts/repositories/IVeterinariansRepository";

interface IRequest {
  clinic_id: string;
}

@injectable()
class ListVeterinarianByClinic {
  constructor(
    @inject("VeterinariansRepository")
    private veterinariansRepository: IVeterinariansRepository
  ) {}

  async execute({ clinic_id }: IRequest): Promise<Veterinarian[]> {
    const veterinarians = await this.veterinariansRepository.findByClinic(
      clinic_id
    );

    return veterinarians;
  }
}

export { ListVeterinarianByClinic };

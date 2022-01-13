import { injectable, inject } from "tsyringe";

import { IRadiologistsRepository } from "@modules/accounts/repositories/IRadiologistsRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  radiologist_id: string;
  avatar_file: string;
}

@injectable()
class UpdateRadiologistAvatarUseCase {
  constructor(
    @inject("RadiologistsRepository")
    private radiologistsRepository: IRadiologistsRepository
  ) {}
  async execute({ radiologist_id, avatar_file }: IRequest): Promise<void> {
    const radiologist = await this.radiologistsRepository.findById(
      radiologist_id
    );

    if (radiologist.avatar) {
      await deleteFile(`./tmp/avatar/${radiologist.avatar}`);
    }

    radiologist.avatar = avatar_file;

    await this.radiologistsRepository.create(radiologist);
  }
}

export { UpdateRadiologistAvatarUseCase };

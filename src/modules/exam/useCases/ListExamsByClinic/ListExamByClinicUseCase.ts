import { injectable, inject } from "tsyringe";

import { Exam } from "@modules/exam/infra/typeorm/entities/Exam";
import { IExamsRepository } from "@modules/exam/repositories/IExamsRepository";

interface IRequest {
  clinic_id: string;
  veterinarian_id?: string;
  race?: string;
}

@injectable()
class ListExamByClinic {
  constructor(
    @inject("ExamsRepository")
    private examsRepository: IExamsRepository
  ) {}

  async execute({
    clinic_id,
    veterinarian_id,
    race,
  }: IRequest): Promise<Exam[]> {
    const exam = await this.examsRepository.findByQuery(
      clinic_id,
      veterinarian_id,
      race
    );

    return exam;
  }
}

export { ListExamByClinic };

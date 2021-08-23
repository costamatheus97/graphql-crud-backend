import { injectable, inject } from "tsyringe";

import { Exam } from "@modules/exam/infra/typeorm/entities/Exam";
import { IExamsRepository } from "@modules/exam/repositories/IExamsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  clinic_id: string;
  veterinarian_id?: string;
  race?: string;
}

@injectable()
class ListExamByClinic {
  constructor(
    @inject("CarsRepository")
    private examsRepository: IExamsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    clinic_id,
    veterinarian_id,
    race,
  }: IRequest): Promise<Exam[]> {
    const exam = await this.examsRepository.findByClinic(
      clinic_id,
      veterinarian_id,
      race
    );

    return exam;
  }
}

export { ListExamByClinic };

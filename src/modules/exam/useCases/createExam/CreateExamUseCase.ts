import { injectable, inject } from "tsyringe";

import { Exam } from "@modules/exam/infra/typeorm/entities/Exam";
import { IExamsRepository } from "@modules/exam/repositories/IExamsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  name: string;
  species: string;
  gender: string;
  race: string;
  age: number;
  exam_region: string;
  projection: string;
  history: string;
  clinic_suspect: string;
  x_ray: string;
  priority: string;
  clinic_id: string;
  veterinarian_id: string;
}

@injectable()
class CreateExamUseCase {
  constructor(
    @inject("CarsRepository")
    private examsRepository: IExamsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    name,
    species,
    gender,
    race,
    age,
    exam_region,
    projection,
    history,
    clinic_suspect,
    x_ray,
    priority,
    clinic_id,
    veterinarian_id,
  }: IRequest): Promise<Exam> {
    const expectedConclusionDate =
      this.dateProvider.calculateDateByPriority(priority);

    const exam = await this.examsRepository.create({
      name,
      species,
      gender,
      race,
      age,
      exam_region,
      projection,
      history,
      clinic_suspect,
      x_ray,
      priority,
      expected_conclusion_date: expectedConclusionDate,
      clinic_id,
      veterinarian_id,
    });

    return exam;
  }
}

export { CreateExamUseCase };

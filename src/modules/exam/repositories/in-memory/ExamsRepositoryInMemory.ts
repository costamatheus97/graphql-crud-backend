import { ICreateExamDTO } from "@modules/exam/dtos/ICreateExamDTO";
import { Exam } from "@modules/exam/infra/typeorm/entities/Exam";

import { IExamsRepository } from "../IExamsRepository";

class ExamsRepositoryInMemory implements IExamsRepository {
  exams: Exam[] = [];

  async updateStatus(id: string, report_status: string): Promise<void> {
    const index = this.exams.findIndex((exam) => exam.id === id);

    this.exams[index].report_status = report_status;
  }

  async findById(id: string): Promise<Exam> {
    const exam = this.exams.find((exam) => exam.id === id);

    return exam;
  }

  async create({
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
  }: ICreateExamDTO): Promise<Exam> {
    const exam = new Exam();

    Object.assign(exam, {
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
    });

    this.exams.push(exam);

    return exam;
  }
}

export { ExamsRepositoryInMemory };

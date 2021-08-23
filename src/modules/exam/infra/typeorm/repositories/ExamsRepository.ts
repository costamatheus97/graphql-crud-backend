import { getRepository, Repository } from "typeorm";

import { ICreateExamDTO } from "@modules/exam/dtos/ICreateExamDTO";
import { IExamsRepository } from "@modules/exam/repositories/IExamsRepository";

import { Exam } from "../entities/Exam";

class ExamsRepository implements IExamsRepository {
  private repository: Repository<Exam>;
  constructor() {
    this.repository = getRepository(Exam);
  }

  async findByQuery(
    clinic_id?: string,
    veterinarian_id?: string,
    race?: string
  ): Promise<Exam[]> {
    const examsQuery = await this.repository
      .createQueryBuilder("c")
      .where("clinic_id = :clinic_id", { clinic_id });

    if (veterinarian_id) {
      examsQuery.andWhere("veterinarian_id = :veterinarian_id", {
        veterinarian_id,
      });
    }

    if (race) {
      examsQuery.andWhere("race = :race", { race });
    }

    const exams = examsQuery.getMany();

    return exams;
  }

  async updateStatus(id: string, report_status: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ report_status })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }

  async findById(id: string): Promise<Exam> {
    const car = await this.repository.findOne({ where: { id } });

    return car;
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
    report_status,
    payment_status,
    value,
    expected_conclusion_date,
    conclusion_date,
    report,
    clinic_id,
    veterinarian_id,
    radiologist_id,
    id,
  }: ICreateExamDTO): Promise<Exam> {
    const exam = this.repository.create({
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
      report_status,
      payment_status,
      value,
      conclusion_date,
      expected_conclusion_date,
      report,
      clinic_id,
      veterinarian_id,
      radiologist_id,
      id,
    });

    await this.repository.save(exam);

    return exam;
  }
}

export { ExamsRepository };

import { ICreateExamDTO } from "../dtos/ICreateExamDTO";
import { Exam } from "../infra/typeorm/entities/Exam";

interface IExamsRepository {
  findById(id: string): Promise<Exam>;
  create(data: ICreateExamDTO): Promise<Exam>;
  updateStatus(id: string, report_status: string): Promise<void>;
  findByQuery(
    clinic_id: string,
    veterinarian_id?: string,
    race?: string
  ): Promise<Exam[]>;
}

export { IExamsRepository };

import {
  Entity,
  CreateDateColumn,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Exam } from "@modules/exam/infra/typeorm/entities/Exam";

import { Clinic } from "./Clinic";

@Entity("veterinarians")
export class Veterinarian {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  crmv: string;

  @OneToMany(() => Exam, (exam) => exam.id)
  @JoinColumn({ name: "exam_id" })
  exams: Exam[];

  @ManyToOne(() => Exam)
  @JoinColumn({ name: "clinic_id" })
  clinic: Clinic;

  @Column()
  clinic_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

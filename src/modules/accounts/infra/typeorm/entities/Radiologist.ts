import {
  Entity,
  CreateDateColumn,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Exam } from "@modules/exam/infra/typeorm/entities/Exam";

@Entity("radiologists")
export class Radiologist {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  avatar: string;

  @Column()
  crmv: string;

  @OneToMany(() => Exam, (exam) => exam.id)
  @JoinColumn({ name: "exam_id" })
  exams: Exam[];

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

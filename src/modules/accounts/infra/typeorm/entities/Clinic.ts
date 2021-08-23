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

import { Veterinarian } from "./Veterinarians";

@Entity("clinics")
export class Clinic {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  owner_name: string;

  @Column()
  owner_crmv: string;

  @Column()
  phone: string;

  @Column()
  cnpj: string;

  @OneToMany(() => Exam, (exam) => exam.id)
  @JoinColumn({ name: "exam_id" })
  exams: Exam[];

  @OneToMany(() => Veterinarian, (veterinarian) => veterinarian.id)
  @JoinColumn({ name: "veterinarian_id" })
  veterinarians: Veterinarian[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

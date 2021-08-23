import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Clinic } from "@modules/accounts/infra/typeorm/entities/Clinic";
import { Radiologist } from "@modules/accounts/infra/typeorm/entities/Radiologist";
import { Veterinarian } from "@modules/accounts/infra/typeorm/entities/Veterinarians";

@Entity("exams")
export class Exam {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  gender: string;

  @Column()
  race: string;

  @Column()
  age: number;

  @Column()
  exam_region: string;

  @Column()
  projection: string;

  @Column()
  history: string;

  @Column()
  clinic_suspect: string;

  @Column()
  x_ray: string;

  @Column()
  priority: string;

  @Column()
  report_status: string;

  @Column()
  payment_status: string;

  @Column()
  value: string;

  @Column()
  expected_conclusion_date: Date;

  @Column()
  conclusion_date: Date;

  @Column()
  report: string;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: "clinic_id" })
  clinic: Clinic;

  @Column()
  clinic_id: string;

  @ManyToOne(() => Veterinarian)
  @JoinColumn({ name: "veterinarian_id" })
  veterinarian: Veterinarian;

  @Column()
  veterinarian_id: string;

  @ManyToOne(() => Radiologist)
  @JoinColumn({ name: "radiologist_id" })
  radiologist: Radiologist;

  @Column()
  radiologist_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

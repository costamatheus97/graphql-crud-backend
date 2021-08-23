interface ICreateExamDTO {
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
  report_status?: string;
  payment_status?: string;
  value?: string;
  expected_conclusion_date: Date;
  conclusion_date?: Date;
  report?: string;
  clinic_id: string;
  veterinarian_id: string;
  radiologist_id?: string;
  id?: string;
}

export { ICreateExamDTO };

interface ICreateRadiologistDTO {
  name: string;
  email: string;
  password: string;
  crmv: string;
  description: string;
  id?: string;
  avatar?: string;
}

export { ICreateRadiologistDTO };

interface ICreateClinicDTO {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  address: string;
  owner_name: string;
  owner_crmv: string;
  phone: string;
  id?: string;
}

export { ICreateClinicDTO };

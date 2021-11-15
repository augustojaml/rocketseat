interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  email: string;
  drive_license: string;
  avatar?: string;
}

export { ICreateUserDTO };

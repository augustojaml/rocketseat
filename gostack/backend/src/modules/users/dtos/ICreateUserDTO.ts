interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  isHairdresser?: boolean;
}

export { ICreateUserDTO };

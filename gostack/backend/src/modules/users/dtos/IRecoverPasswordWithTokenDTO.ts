interface IRecoverPasswordWithTokenDTO {
  token?: string;
  new_password: string;
  confirm_password: string;
}

export { IRecoverPasswordWithTokenDTO };

interface IResponseAuthenticateUserDTO {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

export { IResponseAuthenticateUserDTO };

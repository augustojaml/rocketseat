interface ICreateUsersTokensDTO {
  type: string;
  refresh_token: string;
  user_id: string;
  expire_date: Date;
}

export { ICreateUsersTokensDTO };

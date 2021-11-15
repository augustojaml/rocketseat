import { UsersTokens } from '@modules/users/infra/typeorm/entities/UsersTokens';

import { ICreateUsersTokensDTO } from '../dtos/ICreateUsersTokensDTO';

interface IUsersTokensRepository {
  create({ refresh_token, user_id, expires_date }: ICreateUsersTokensDTO): Promise<UsersTokens>;
  deleteByUserId(user_id: string): Promise<void>;
  findByIdAndRefresh(user_id: string, refresh: string): Promise<UsersTokens>;
  deleteUsersTokenById(id: string): Promise<void>;
  findBydRefreshToken(refresh_token: string): Promise<UsersTokens>;
}

export { IUsersTokensRepository };

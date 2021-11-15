import { ICreateUsersTokensDTO } from '@modules/accounts/dtos/ICreateUserTokensDTO';
import { UsersTokens } from '@modules/accounts/infra/typeorm/entities/UsersTokens';

interface IUsersTokensRepository {
  create({ refresh_token, user_id, expires_date }: ICreateUsersTokensDTO): Promise<UsersTokens>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens>;
  deleteById(id: string): Promise<void>;
  findBydRefreshToken(refresh_token: string): Promise<UsersTokens>;
  findByUserId(user_id: string): Promise<UsersTokens>;
}

export { IUsersTokensRepository };

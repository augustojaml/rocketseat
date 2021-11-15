import { UsersTokens } from '@prisma/client';

import { ICreateUsersTokensDTO } from '../dtos/ICreateUsersTokensDTO';

interface IUsersTokensRepository {
  create({ type, refresh_token, user_id, expire_date }: ICreateUsersTokensDTO): Promise<UsersTokens>;
  findBydRefreshToken(refresh_token: string): Promise<UsersTokens>;
  deleteById(id: string): Promise<void>;
  findUsersTokensByUserId(user_id: string): Promise<UsersTokens>;
}

export { IUsersTokensRepository };

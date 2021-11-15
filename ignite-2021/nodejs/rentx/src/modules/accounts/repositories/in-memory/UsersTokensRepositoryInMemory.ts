import { ICreateUsersTokensDTO } from '@modules/accounts/dtos/ICreateUserTokensDTO';
import { UsersTokens } from '@modules/accounts/infra/typeorm/entities/UsersTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private repository: UsersTokens[] = [];

  public async create({ refresh_token, user_id, expires_date }: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const usersTokens = new UsersTokens();
    Object.assign(usersTokens, {
      refresh_token,
      user_id,
      expires_date,
    });

    this.repository.push(usersTokens);
    return usersTokens;
  }
  public async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.find(usersTokens => usersTokens.user_id === user_id && usersTokens.refresh_token === refresh_token);
    return usersTokens;
  }

  public async deleteById(id: string): Promise<void> {
    const usersTokens = await this.repository.find(usersToken => usersToken.id === id);
    const index = this.repository.indexOf(usersTokens);
    this.repository.splice(index, 1);
  }
  public async findBydRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.find(usersToken => usersToken.refresh_token === refresh_token);
    return usersTokens;
  }
  public async findByUserId(user_id: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.find(usersToken => usersToken.user_id === user_id);
    return usersTokens;
  }
}

export { UsersTokensRepositoryInMemory };

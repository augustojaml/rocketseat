import { getRepository, Repository } from 'typeorm';

import { ICreateUsersTokensDTO } from '@modules/accounts/dtos/ICreateUserTokensDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UsersTokens } from '../entities/UsersTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = getRepository(UsersTokens);
  }

  public async create({ refresh_token, user_id, expires_date }: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const usersTokensRepository = this.repository.create({ refresh_token, user_id, expires_date });
    const usersToken = await this.repository.save(usersTokensRepository);
    return usersToken;
  }

  public async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.findOne({ user_id: user_id, refresh_token: refresh_token });
    return usersTokens;
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findBydRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.findOne({ refresh_token: refresh_token });
    return usersTokens;
  }

  public async findByUserId(user_id: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.findOne({ user_id: user_id });
    return usersTokens;
  }
}

export { UsersTokensRepository };

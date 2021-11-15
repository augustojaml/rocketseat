import { getRepository, Repository } from 'typeorm';

import { ICreateUsersTokensDTO } from '@modules/users/dtos/ICreateUsersTokensDTO';
import { UsersTokens } from '@modules/users/infra/typeorm/entities/UsersTokens';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = getRepository(UsersTokens);
  }

  public async create({ refresh_token, user_id, expires_date }: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const repo = this.repository.create({ refresh_token, user_id, expires_date });
    const usersTokens = await this.repository.save(repo);
    return usersTokens;
  }

  public async deleteByUserId(user_id: string): Promise<void> {
    await this.repository.delete({ user_id });
  }

  public async findByIdAndRefresh(user_id: string, refresh: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.findOne({ user_id, refresh_token: refresh });
    return usersTokens;
  }

  public async deleteUsersTokenById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findBydRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.findOne({ refresh_token: refresh_token });
    return usersTokens;
  }
}

export { UsersTokensRepository };

import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}

export { ListUsersUseCase };

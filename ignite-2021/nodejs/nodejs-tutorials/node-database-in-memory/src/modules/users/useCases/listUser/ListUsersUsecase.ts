import { User } from '../../models/User';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

class ListUsersUsecase {
  constructor(private repository: UsersRepository) {}

  public async execute(): Promise<User[]> {
    const users = await this.repository.index();
    return users;
  }
}

export { ListUsersUsecase };

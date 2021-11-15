import { inject, injectable } from 'tsyringe';

import { IUsersImplement } from '@modules/users/implements/IUsersImplement';
import { User } from '@modules/users/infra/typeorm/entities/User';

@injectable()
class ListUsersCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersImplement,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();
    return users;
  }
}

export { ListUsersCase };

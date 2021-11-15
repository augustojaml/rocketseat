import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { AppError } from '../../../../errors/AppError';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class ShowUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    if (!validate(id)) {
      throw new AppError('Not valid uuid');
    }

    const findUser = await this.repository.findById(id);
    if (!findUser) {
      throw new AppError('No-existent user');
    }

    return findUser;
  }
}

export { ShowUserUseCase };

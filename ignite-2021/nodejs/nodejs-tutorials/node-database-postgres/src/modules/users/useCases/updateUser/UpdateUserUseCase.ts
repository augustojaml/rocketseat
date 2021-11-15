import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { AppError } from '../../../../errors/AppError';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IUpdateUserUse {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute({ id, name, email }: IUpdateUserUse): Promise<User> {
    if (!validate(id)) {
      throw new AppError('Not valid uuid');
    }

    const findUser = await this.repository.findById(id);
    if (!findUser) {
      throw new AppError('No-existent user');
    }
    findUser.name = name;
    findUser.email = email;
    const updateUser = await this.repository.update(findUser);

    return updateUser;
  }
}

export { UpdateUserUseCase };

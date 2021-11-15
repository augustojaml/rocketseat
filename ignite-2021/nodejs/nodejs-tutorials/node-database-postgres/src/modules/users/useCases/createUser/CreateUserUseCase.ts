import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface ICreateUserUseCase {
  name: string;
  email: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute({ name, email }: ICreateUserUseCase): Promise<User> {
    const findUser = await this.repository.findByEmail(email);
    if (findUser) {
      throw new AppError('User already exists');
    }

    const user = await this.repository.create({
      name: name,
      email: email,
    });

    return user;
  }
}

export { CreateUserUseCase };

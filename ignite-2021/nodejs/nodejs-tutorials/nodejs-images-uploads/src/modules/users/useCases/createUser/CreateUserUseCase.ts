import { inject, injectable } from 'tsyringe';

import { ICreateUsersDTO } from '@modules/users//dtos/ICreateUserDTO';
import { IUsersImplement } from '@modules/users//implements/IUsersImplement';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersImplement,
  ) {}

  public async execute({ name, email }: ICreateUsersDTO): Promise<User> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (findUser) {
      throw new AppError('User already exists');
    }

    const user = await this.usersRepository.create({ name, email });

    return user;
  }
}

export { CreateUserUseCase };

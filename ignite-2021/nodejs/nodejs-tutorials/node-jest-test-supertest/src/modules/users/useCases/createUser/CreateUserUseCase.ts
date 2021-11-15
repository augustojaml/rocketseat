import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email }: ICreateUserDTO): Promise<User> {
    const findUser = await this.usersRepository.findByEmail(email);
    if (findUser) {
      throw new AppError('User already exists');
    }

    const user = await this.usersRepository.create({
      name,
      email,
    });

    return user;
  }
}
export { CreateUserUseCase };

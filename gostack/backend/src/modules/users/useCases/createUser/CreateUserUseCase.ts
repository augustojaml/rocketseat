import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { PasswordSupport } from '@support/PasswordSupport';

import { User } from '.prisma/client';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password, isHairdresser }: ICreateUserDTO): Promise<User> {
    const findUser = await this.usersRepository.findByEmail(email);
    if (findUser) {
      throw new AppError('User already exists');
    }

    const hashPassword = await PasswordSupport.generateHash(password);

    const user = await this.usersRepository.create({
      name: name,
      email: email,
      password: hashPassword,
      isHairdresser: isHairdresser,
    });

    return user;
  }
}

export { CreateUserUseCase };

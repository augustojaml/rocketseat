import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute({ name, password, email, drive_license }: ICreateUserDTO): Promise<User> {
    const findUserEmail = await this.repository.findByEmail(email);
    if (findUserEmail) {
      throw new AppError(`User with email ${email} already exists`);
    }

    const hashPassword = await hash(password, 8);

    const user = await this.repository.create({
      name,
      password: hashPassword,
      email,
      drive_license,
    });

    return user;
  }
}

export { CreateUserUseCase };

import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IAuthenticateUserDTO } from '@modules/users/dtos/IAuthenticateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { AuthSupport } from '@support/AuthSupport';
import { PasswordSupport } from '@support/PasswordSupport';
import { StorageSupport } from '@support/StorageSupport';

interface IAuthenticateUserUseCase {
  user: {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IAuthenticateUserDTO): Promise<IAuthenticateUserUseCase> {
    const findUser = await this.usersRepository.findByEmail(email);
    if (!findUser) {
      throw new AppError('Email or password invalid');
    }

    const comparePassword = await PasswordSupport.compareHash(password, findUser.password);

    if (!comparePassword) {
      throw new AppError('Email or password invalid');
    }

    const token = sign({}, AuthSupport.tokenHash, {
      subject: findUser.id,
      expiresIn: AuthSupport.tokenExpireIn,
    });

    return {
      user: {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        avatar_url: findUser.avatar && `${StorageSupport.appURL}/avatar/${findUser.avatar}`,
      },
      token: token,
    };
  }
}
export { AuthenticateUserUseCase };

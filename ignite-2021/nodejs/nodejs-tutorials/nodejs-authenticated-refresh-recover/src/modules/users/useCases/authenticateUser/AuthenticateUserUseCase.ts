import { sign } from 'jsonwebtoken';
import { Auth } from 'supports/Auth';
import { CustomDate } from 'supports/CustomDate';
import { HashPassword } from 'supports/HashPassword';
import { inject, injectable } from 'tsyringe';

import { IAuthenticateUserDTO } from '@modules/users/dtos/IAuthenticateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IAuthenticateUser {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({ email, password }: IAuthenticateUserDTO): Promise<IAuthenticateUser> {
    const findUser = await this.userRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('Email or password invalid');
    }

    const comparePassword = await HashPassword.compare(password, findUser.password);

    if (!comparePassword) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, Auth.tokenHash, {
      subject: findUser.id,
      expiresIn: Auth.tokenExpireIn,
    });

    const refreshToken = sign({ email }, Auth.refreshTokenHash, {
      subject: findUser.id,
      expiresIn: Auth.refreshTokenExpireIn,
    });

    const refreshTokenExpireDate = CustomDate.addDays(Auth.refreshTokenExpireInDay);

    await this.usersTokensRepository.deleteByUserId(findUser.id);

    await this.usersTokensRepository.create({
      refresh_token: refreshToken,
      user_id: findUser.id,
      expires_date: refreshTokenExpireDate,
    });

    return {
      user: {
        name: findUser.name,
        email: findUser.email,
      },
      token: token,
      refreshToken: refreshToken,
    };
  }
}

export { AuthenticateUserUseCase };

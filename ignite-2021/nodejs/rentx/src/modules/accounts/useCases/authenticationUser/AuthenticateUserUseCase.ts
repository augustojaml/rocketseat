import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { secret } from '@config/secret';
import { IAuthenticateUserDTO } from '@modules/accounts/dtos/IAuthenticateUserDTO';
import { IResponseAuthenticateUserDTO } from '@modules/accounts/dtos/IResponseAuthenticateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  public async execute({ email, password }: IAuthenticateUserDTO): Promise<IResponseAuthenticateUserDTO> {
    const findUser = await this.repository.findByEmail(email);
    if (!findUser) {
      throw new AppError('Email or password incorrect');
    }

    const comparePassword = await compare(password, findUser.password);

    if (!comparePassword) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({ email }, secret.hash, {
      subject: findUser.id,
      expiresIn: secret.expiredIn,
    });

    const refresh_token = sign({ email }, secret.hash, {
      subject: findUser.id,
      expiresIn: secret.expires_refresh_token,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(secret.expires_refresh_token_days);

    await this.usersTokensRepository.create({
      refresh_token: refresh_token,
      user_id: findUser.id,
      expires_date: refresh_token_expires_date,
    });

    return {
      user: {
        name: findUser.name,
        email: findUser.email,
      },
      token: token,
      refresh_token: refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };

import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { secret } from '@config/secret';
import { IRefreshTokenDTO } from '@modules/accounts/dtos/IRefreshTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  public async execute(token: string): Promise<IRefreshTokenDTO> {
    const { sub: user_id, email } = verify(token, secret.hash) as { sub: string; email: string };

    const findUserToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);
    if (!findUserToken) {
      throw new AppError('Refresh token does not exists');
    }

    await this.usersTokensRepository.deleteById(findUserToken.id);

    const refresh_token = sign({ email }, secret.hash, {
      subject: user_id,
      expiresIn: secret.expires_refresh_token,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(secret.expires_refresh_token_days);

    await this.usersTokensRepository.create({
      refresh_token: refresh_token,
      user_id: user_id,
      expires_date: refresh_token_expires_date,
    });

    const newToken = sign({}, secret.hash, {
      subject: user_id,
      expiresIn: secret.expires_refresh_token,
    });

    return { token: newToken, refresh_token: refresh_token };
  }
}

export { RefreshTokenUseCase };

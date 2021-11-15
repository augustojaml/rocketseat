import { sign, verify } from 'jsonwebtoken';
import { Auth } from 'supports/Auth';
import { CustomDate } from 'supports/CustomDate';
import { inject, injectable } from 'tsyringe';

import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IResponse {
  newToken: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute(refreshToken: string): Promise<IResponse> {
    const { sub: user_id, email } = verify(refreshToken, Auth.refreshTokenHash) as { sub: string; email: string };

    const findUsersToken = await this.usersTokensRepository.findByIdAndRefresh(user_id, refreshToken);

    if (!findUsersToken) {
      throw new AppError('Refresh token does not exits');
    }

    await this.usersTokensRepository.deleteUsersTokenById(findUsersToken.id);

    const newRefreshToken = sign({ email }, Auth.refreshTokenHash, {
      subject: user_id,
      expiresIn: Auth.refreshTokenExpireIn,
    });

    await this.usersTokensRepository.create({
      refresh_token: newRefreshToken,
      user_id: user_id,
      expires_date: CustomDate.addDays(Auth.refreshTokenExpireInDay),
    });

    const newToken = sign({}, Auth.tokenHash, {
      subject: user_id,
      expiresIn: Auth.tokenExpireIn,
    });

    return {
      newToken,
      refreshToken,
    };
  }
}

export { RefreshTokenUseCase };

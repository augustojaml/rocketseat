import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IResetPasswordDTO } from '@modules/accounts/dtos/IResetPasswordDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ token, password }: IResetPasswordDTO): Promise<void> {
    const findUserToken = await this.usersTokensRepository.findBydRefreshToken(token);
    if (!findUserToken) {
      throw new AppError('Token expired');
    }
    if (this.dayjsDateProvider.compareIfBefore(findUserToken.expires_date, this.dayjsDateProvider.dateNow())) {
      throw new AppError('Token expired');
    }

    const findUser = await this.usersRepository.findById(findUserToken.user_id);
    findUser.password = await hash(password, 8);
    await this.usersRepository.create(findUser);
    await this.usersTokensRepository.deleteById(findUserToken.id);
  }
}

export { ResetPasswordUseCase };

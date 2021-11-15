import { CustomDate } from 'supports/CustomDate';
import { HashPassword } from 'supports/HashPassword';
import { inject, injectable } from 'tsyringe';

import { IResetPasswordDTO } from '@modules/users/dtos/IResetPasswordDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ token, password }: IResetPasswordDTO): Promise<void> {
    const findUserToken = await this.usersTokensRepository.findBydRefreshToken(token);
    if (!findUserToken) {
      throw new AppError('Token expired');
    }

    const compareDate = CustomDate.compareIfBefore(findUserToken.expires_date, CustomDate.dateNow());

    if (compareDate) {
      throw new AppError('Token expired');
    }

    const findUser = await this.usersRepository.findById(findUserToken.user_id);

    findUser.password = await HashPassword.hash(password);

    await this.usersRepository.create(findUser);

    await this.usersTokensRepository.deleteUsersTokenById(findUserToken.id);

    // console.log({
    //   token,
    //   password,
    //   findUserToken,
    //   expires_date: findUserToken.expires_date,
    //   now: CustomDate.dateNow(),
    //   compareDate,
    //   findUser,
    // });
  }
}

export { ResetPasswordUseCase };

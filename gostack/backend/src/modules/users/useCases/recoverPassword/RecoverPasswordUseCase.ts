import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IRecoverPasswordWithTokenDTO } from '@modules/users/dtos/IRecoverPasswordWithTokenDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/infra/middlewares/errors/AppError';

@injectable()
class RecoverPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ token, new_password }: IRecoverPasswordWithTokenDTO): Promise<void> {
    const findUserToken = await this.usersTokensRepository.findBydRefreshToken(token);

    if (!findUserToken) {
      throw new AppError('Token expired');
    }

    const isBefore = this.dateProvider.compareIfBefore(findUserToken.expire_date, new Date());

    if (isBefore) {
      throw new AppError('Token expired');
    }

    const findUser = await this.usersRepository.findById(findUserToken.user_id);

    findUser.password = await hash(new_password, 8);

    await this.usersRepository.update(findUser);

    await this.usersTokensRepository.deleteById(findUserToken.id);
  }
}

export { RecoverPasswordUseCase };

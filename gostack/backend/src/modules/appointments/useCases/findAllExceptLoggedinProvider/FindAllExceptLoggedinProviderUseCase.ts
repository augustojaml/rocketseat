import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/infra/middlewares/errors/AppError';

import { User } from '.prisma/client';

@injectable()
class FindAllExceptLoggedinProviderUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User[]> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    const providers = await this.usersRepository.findAllProvidersExceptLoggedin(user_id);

    return providers;
  }
}

export { FindAllExceptLoggedinProviderUseCase };

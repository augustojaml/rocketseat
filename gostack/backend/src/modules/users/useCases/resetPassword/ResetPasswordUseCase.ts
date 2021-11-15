import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IResetPasswordDTO } from '@modules/users/dtos/IResetPasswordDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/infra/middlewares/errors/AppError';

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, new_password }: IResetPasswordDTO): Promise<void> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('Only authenticated users can change password.', 401);
    }

    findUser.password = await hash(new_password, 8);

    await this.usersRepository.update(findUser);
  }
}

export { ResetPasswordUseCase };

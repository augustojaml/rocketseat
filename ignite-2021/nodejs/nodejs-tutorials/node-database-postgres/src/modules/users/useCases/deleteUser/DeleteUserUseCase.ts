import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}
  public async execute(id: string): Promise<void> {
    if (!validate(id)) {
      throw new AppError('Not valid uuid');
    }

    const findUser = await this.repository.findById(id);
    if (!findUser) {
      throw new AppError('No-existent user');
    }

    await this.repository.destroy(id);
  }
}

export { DeleteUserUseCase };

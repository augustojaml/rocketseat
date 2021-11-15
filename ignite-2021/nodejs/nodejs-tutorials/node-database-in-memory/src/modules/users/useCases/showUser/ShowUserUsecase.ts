import { AppError } from '../../../../erros/supportErrors';
import { User } from '../../models/User';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

class ShowUserUsecase {
  constructor(private repository: UsersRepository) {}
  public async execute(id: string): Promise<User> {
    const findUser = await this.repository.findById(id);

    if (!findUser) {
      throw new AppError('No-existent user');
    }
    return findUser;
  }
}

export { ShowUserUsecase };

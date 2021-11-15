import { AppError } from '../../../../erros/supportErrors';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

class DeleteUserUsecase {
  constructor(private repository: UsersRepository) {}

  public async execute(id: string): Promise<void> {
    const findUser = await this.repository.findById(id);
    if (!findUser) {
      throw new AppError('No-existent user');
    }
    await this.repository.destroy(id);
  }
}

export { DeleteUserUsecase };

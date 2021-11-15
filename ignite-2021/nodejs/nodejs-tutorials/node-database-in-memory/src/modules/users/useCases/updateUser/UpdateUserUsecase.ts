import { AppError } from '../../../../erros/supportErrors';
import { User } from '../../models/User';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateUserUsecase {
  constructor(private repository: UsersRepository) {}
  public async execute({ id, name, email }: IRequest): Promise<User> {
    const findUser = await this.repository.findById(id);

    if (!findUser) {
      throw new AppError('No-existent user');
    }

    findUser.name = name;
    findUser.email = email;

    const user = await this.repository.update(findUser);
    return user;
  }
}

export { UpdateUserUsecase };

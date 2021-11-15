import { AppError } from '../../../../erros/supportErrors';
import { User } from '../../models/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IUserRequest {
  name: string;
  email: string;
}

class CreateUserUsecase {
  constructor(private repository: IUsersRepository) {}

  public async execute({ name, email }: IUserRequest): Promise<User> {
    const existingUser = await this.repository.findByEmail(email);
    if (existingUser) {
      throw new AppError(`User already exists`);
    }

    const user = await this.repository.store({ name, email });

    return user;
  }
}

export { CreateUserUsecase };

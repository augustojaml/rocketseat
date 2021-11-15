import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  public async create({ name, password, email, drive_license }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      name,
      password,
      email,
      drive_license,
    });
    this.users.push(user);
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.users.find(user => user.email === email);
    return user;
  }

  public async all(): Promise<User[]> {
    const users = await this.users;
    return users;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.users.find(user => user.id === id);
    return user;
  }
}

export { UsersRepositoryInMemory };

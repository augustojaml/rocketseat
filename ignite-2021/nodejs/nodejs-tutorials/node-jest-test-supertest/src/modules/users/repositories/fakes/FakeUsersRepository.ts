import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private repository: User[] = [];

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.find(user => user.email === email);
    return user;
  }
  public async create({ name, email }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
    });

    await this.repository.push(user);
    return user;
  }
  public async findAll(): Promise<User[]> {
    const users = await this.repository;
    return users;
  }
}

export { FakeUsersRepository };

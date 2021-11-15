import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ id, name, email, password }: ICreateUserDTO): Promise<User> {
    const repo = this.repository.create({
      id,
      name,
      email,
      password,
    });
    const user = await this.repository.save(repo);
    return user;
  }

  findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email });
    return user;
  }

  public async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  findById(id: string): Promise<User> {
    const user = this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };

import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  public async create({ id, name, password, email, drive_license, avatar }: ICreateUserDTO): Promise<User> {
    const repository = this.repository.create({
      id,
      name,
      password,
      email,
      drive_license,
      avatar,
    });

    const user = await this.repository.save(repository);
    return user;
  }

  public async all(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };

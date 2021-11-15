import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { ICreateUser, IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ name, email }: ICreateUser): Promise<User> {
    const user = this.repository.create({
      name: name,
      email: email,
    });
    await this.repository.save(user);

    return user;
  }

  public async find(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email: email });
    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  public async update(user: User): Promise<User> {
    const updateUser = await this.repository.save(user);
    return updateUser;
  }

  public async destroy(id: string): Promise<void> {
    const user = await this.findById(id);

    await this.repository.remove(user);
  }
}

export { UsersRepository };

import { getRepository, Repository, Not } from 'typeorm';

import { User } from '../database/entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';

class UsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const repo = this.repository.create({
      name,
      email,
      password,
    });

    const user = await this.repository.save(repo);
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const findUser = await this.repository.findOne({ email });
    return findUser;
  }

  public async all(): Promise<User[]> {
    const users = await this.repository.find({ where: { name: Not('admin') } });
    return users;
  }

  public async findById(id: string): Promise<User> {
    const findUser = await this.repository.findOne(id);
    return findUser;
  }

  public async findAdmin(): Promise<User> {
    const users = await this.repository.findOne({ name: 'admin' });
    return users;
  }

  public async update({ id, name, email, password, avatar }: IUpdateUserDTO): Promise<User> {
    const repo = this.repository.create({
      id,
      name,
      email,
      password,
      avatar,
    });
    const user = await this.repository.save(repo);
    return user;
  }
}
export { UsersRepository };

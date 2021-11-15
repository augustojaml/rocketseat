import { getRepository, Repository } from 'typeorm';

import { ICreateUsersDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersImplement } from '@modules/users/implements/IUsersImplement';

import { User } from '../entities/User';

class UsersRepository implements IUsersImplement {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ id, name, email, photos }: ICreateUsersDTO): Promise<User> {
    const repo = this.repository.create({ id, name, email, photos });

    const user = await this.repository.save(repo);

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  public async list(): Promise<User[]> {
    const users = await this.repository.find({ relations: ['photos'] });
    return users;
  }
}

export { UsersRepository };

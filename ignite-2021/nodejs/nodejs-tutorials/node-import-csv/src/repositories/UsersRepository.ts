import { getRepository, Repository } from 'typeorm';

import { User } from '../entities/User';

export interface ICreateUserDTO {
  profile: string;
  name: string;
}

class UsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ profile, name }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      profile,
      name,
    });

    await this.repository.save(user);
  }

  public async all(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  public async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({ name: name });
    return user;
  }
}

export { UsersRepository };

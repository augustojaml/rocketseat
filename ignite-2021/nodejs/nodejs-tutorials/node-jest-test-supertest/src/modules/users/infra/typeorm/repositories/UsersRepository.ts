import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ id, name, email }: ICreateUserDTO): Promise<User> {
    const repo = this.repository.create({
      id,
      name,
      email,
    });
    const user = await this.repository.save(repo);
    return user;
  }

  findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email });
    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}

export { UsersRepository };

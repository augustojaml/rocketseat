import { User } from '../../models/User';
import { IUserDTO, IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: User[];
  private static INSTANCE: UsersRepository;
  private constructor() {
    this.repository = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }
    return UsersRepository.INSTANCE;
  }

  public async index(): Promise<User[]> {
    const users = this.repository;
    return users;
  }

  public async store({ name, email }: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name: name,
      email: email,
      created_at: new Date(),
    });
    this.repository.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = this.repository.find(user => user.email === email);
    return user;
  }

  public async update(user: User): Promise<User> {
    const findUser = await this.findById(user.id);
    findUser.name = user.name;
    findUser.email = user.email;
    return findUser;
  }

  public async findById(id: string): Promise<User> {
    const user = this.repository.find(user => user.id === id);
    return user;
  }

  public async destroy(id: string): Promise<void> {
    const user = await this.findById(id);
    const index = this.repository.indexOf(user);
    this.repository.splice(index, 1);
  }
}

export { UsersRepository };

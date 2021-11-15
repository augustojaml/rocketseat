import { User } from '../entities/User';

interface ICreateUser {
  name: string;
  email: string;
}

interface IUsersRepository {
  create({ name, email }: ICreateUser): Promise<User>;
  find(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(user: User): Promise<User>;
  destroy(id: string): Promise<void>;
}

export { IUsersRepository, ICreateUser };

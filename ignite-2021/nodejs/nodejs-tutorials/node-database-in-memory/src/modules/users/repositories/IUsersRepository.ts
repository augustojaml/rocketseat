import { User } from '../models/User';

export interface IUserDTO {
  name: string;
  email: string;
}

interface IUsersRepository {
  index(): Promise<User[]>;
  store({ name, email }: IUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(user: User): Promise<User>;
  findById(id: string): Promise<User>;
  destroy(id: string): Promise<void>;
}

export { IUsersRepository };

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  create({ id, name, email, password }: ICreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
}

export { IUsersRepository };

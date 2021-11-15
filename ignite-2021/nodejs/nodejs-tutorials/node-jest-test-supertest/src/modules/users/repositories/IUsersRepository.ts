import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  create({ id, name, email }: ICreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
}

export { IUsersRepository };

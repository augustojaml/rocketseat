import { ICreateUsersDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

interface IUsersImplement {
  create({ id, name, email, photos }: ICreateUsersDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  list(): Promise<User[]>;
}

export { IUsersImplement };

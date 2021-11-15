import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

import { User } from '.prisma/client';

interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<User>;
  update(user: User): Promise<User>;
  findAllProvidersExceptLoggedin(user_id?: string): Promise<User[]>;
}

export { IUsersRepository };

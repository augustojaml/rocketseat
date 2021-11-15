import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import prismaClient from '@shared/infra/prisma/client';

import { User } from '.prisma/client';

class PrismaUsersRepository implements IUsersRepository {
  public async create({ name, email, password, isHairdresser }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
        isHairdresser,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }

  public async findById(user_id: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });
    return user;
  }

  public async update(user: User): Promise<User> {
    const updateUser = await prismaClient.user.update({
      where: { id: user.id },
      data: { password: user.password, avatar: user.avatar },
    });
    return updateUser;
  }

  public async findAllProvidersExceptLoggedin(user_id?: string): Promise<User[]> {
    if (user_id) {
      const users = await prismaClient.user.findMany({
        where: {
          NOT: {
            id: user_id,
          },
        },
      });
      return users;
    }

    const users = await prismaClient.user.findMany();
    return users;
  }
}

export { PrismaUsersRepository };

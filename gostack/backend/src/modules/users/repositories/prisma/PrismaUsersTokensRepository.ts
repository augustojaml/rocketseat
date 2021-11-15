import { ICreateUsersTokensDTO } from '@modules/users/dtos/ICreateUsersTokensDTO';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import prismaClient from '@shared/infra/prisma/client';

import { Prisma, PrismaClient, UsersTokens } from '.prisma/client';

class PrismaUsersTokensRepository implements IUsersTokensRepository {
  private repository: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor() {
    this.repository = prismaClient;
  }

  public async create({ type, refresh_token, user_id, expire_date }: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const usersTokens = await this.repository.usersTokens.create({
      data: {
        type,
        refresh_token,
        user_id,
        expire_date,
      },
    });

    return usersTokens;
  }

  public async findBydRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.usersTokens.findFirst({
      where: {
        refresh_token: refresh_token,
      },
    });

    return usersTokens;
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.usersTokens.delete({
      where: {
        id: id,
      },
    });
  }

  public async findUsersTokensByUserId(user_id: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.usersTokens.findFirst({
      where: {
        user_id: user_id,
      },
    });

    return usersTokens;
  }
}

export { PrismaUsersTokensRepository };

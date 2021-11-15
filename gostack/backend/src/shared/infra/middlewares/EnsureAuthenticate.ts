import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { PrismaUsersRepository } from '@modules/users/repositories/prisma/PrismaUsersRepository';
import { AuthSupport } from '@support/AuthSupport';

import { AppError } from './errors/AppError';

const EnsureAuthenticate = {
  async forUser(request: Request, _: Response, next: NextFunction): Promise<void> {
    try {
      const requestHeader = request.headers.authorization;

      if (!requestHeader) {
        throw new AppError('Invalid token');
      }

      const [, token] = requestHeader.split(' ');

      const { sub: user_id } = verify(token, AuthSupport.tokenHash) as { sub: string };

      const usersRepository = new PrismaUsersRepository();

      const findUser = await usersRepository.findById(user_id);

      if (!findUser) {
        throw new AppError('Invalid token', 401);
      }

      request.user = {
        id: findUser.id,
      };
    } catch (err) {
      throw new AppError(err.message, 401);
      // invalid signature
      // jwt expired
    }

    next();
  },
};

export { EnsureAuthenticate };

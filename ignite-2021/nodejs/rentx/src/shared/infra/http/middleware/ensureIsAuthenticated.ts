import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { secret } from '@config/secret';
import { IPayloadDTO } from '@modules/accounts/dtos/IPayloadDTO';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

async function ensureIsAuthenticated(
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Invalid token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, secret.hash) as IPayloadDTO;
    const usersRepository = new UsersRepository();
    const findUser = await usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('No-existent user', 401);
    }

    request.user = {
      id: findUser.id,
    };
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}

export { ensureIsAuthenticated };

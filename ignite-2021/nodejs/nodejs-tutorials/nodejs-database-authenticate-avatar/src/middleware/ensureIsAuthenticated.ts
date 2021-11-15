import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';
import { security } from '../utils/security';

const ensureIsAuthenticated = async (request: Request, _: Response, next: NextFunction): Promise<void> => {
  const requestHeader = request.headers.authorization;
  if (!requestHeader) {
    throw new AppError('Invalid token');
  }

  const [, token] = requestHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, security.hash) as { sub: string };
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('No-existent user');
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token');
  }
};
export { ensureIsAuthenticated };

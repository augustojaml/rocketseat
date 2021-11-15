import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

const ensureAdmin = async (request: Request, _: Response, next: NextFunction): Promise<void> => {
  const { id } = request.user;
  const usersRepository = new UsersRepository();
  const findUser = await usersRepository.findById(id);
  if (!findUser.is_admin) {
    throw new AppError("User isn't admin");
  }
  return next();
};

export { ensureAdmin };

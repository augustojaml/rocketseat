import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

async function ensureIsAdmin(request: Request, _: Response, next: NextFunction): Promise<void> {
  const { id } = request.user;
  const usersRepository = new UsersRepository();

  const findUser = await usersRepository.findById(id);

  if (!findUser.is_admin) {
    throw new AppError(`user ${findUser.name} isn't an admin`);
  }
  return next();
}

export { ensureIsAdmin };

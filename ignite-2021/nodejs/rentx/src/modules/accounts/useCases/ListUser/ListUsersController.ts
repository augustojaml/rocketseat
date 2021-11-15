import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersUseCase } from '@modules/accounts/useCases/ListUser/LIstUsersUseCase';

class ListUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUsersUseCase);
    const users = await listUser.execute();

    return response.json({ users });
  }
}

export { ListUsersController };

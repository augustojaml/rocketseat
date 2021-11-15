import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersCase } from '@modules/users/useCases/listUsers/ListUsersUseCase';

class ListUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersCase);
    const users = await listUsers.execute();
    return response.json(users);
  }
}

export { ListUsersController };

import { ListUsersUseCase } from '@modules/users/useCases/listUsers/ListUsersUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUsersUseCase);
    const users = await listUser.execute();
    return response.json(users);
  }
}

export { ListUsersController };

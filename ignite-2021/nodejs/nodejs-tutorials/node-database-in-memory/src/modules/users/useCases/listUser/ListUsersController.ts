import { Request, Response } from 'express';

import { ListUsersUsecase } from './ListUsersUsecase';

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUsecase) {}
  public async handle(request: Request, response: Response): Promise<Response> {
    const users = await this.listUsersUseCase.execute();
    return response.status(200).json(users);
  }
}

export { ListUsersController };

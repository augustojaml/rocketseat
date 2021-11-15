import { Request, Response } from 'express';

import { CreateUserUsecase } from './CreateUserUsecase';

class CreateUserController {
  constructor(private createUser: CreateUserUsecase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const user = await this.createUser.execute({ name, email });
    return response.json(user);
  }
}

export { CreateUserController };

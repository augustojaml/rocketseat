import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;
    const createUser = container.resolve(UpdateUserUseCase);
    const user = await createUser.execute({ id, name, email });
    return response.json(user);
  }
}

export { UpdateUserController };

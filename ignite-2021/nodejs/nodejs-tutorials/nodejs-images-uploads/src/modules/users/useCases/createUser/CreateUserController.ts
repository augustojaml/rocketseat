import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '@modules/users/useCases/createUser//CreateUserUseCase';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({ name, email });
    return response.status(201).json(user);
  }
}

export { CreateUserController };

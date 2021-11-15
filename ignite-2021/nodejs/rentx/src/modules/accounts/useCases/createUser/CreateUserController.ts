import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUseUseCase';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, drive_license } = request.body;
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({ name, password, email, drive_license });
    return response.status(201).json({ user });
  }
}

export { CreateUserController };

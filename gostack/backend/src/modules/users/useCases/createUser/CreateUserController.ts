import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';
import { CreateUserValidade } from '@modules/users/validate/CreateUserValidate';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, isHairdresser } = request.body;

    await CreateUserValidade.handle({ name, email, password, isHairdresser });

    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({ name, email, password, isHairdresser });
    return response.status(201).json(user);
  }
}

export { CreateUserController };

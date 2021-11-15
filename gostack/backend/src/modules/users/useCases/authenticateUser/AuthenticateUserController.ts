import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/AuthenticateUserUseCase';
import { AuthenticateUserValidade } from '@modules/users/validate/AuthenticateUserValidate';

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    await AuthenticateUserValidade.handle({ email, password });

    const authenticateUser = container.resolve(AuthenticateUserUseCase);
    const user = await authenticateUser.execute({ email, password });
    return response.status(201).json(user);
  }
}

export { AuthenticateUserController };

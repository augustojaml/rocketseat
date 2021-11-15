import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/AuthenticateUserUseCase';

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserUseCase);
    const authenticate = await authenticateUser.execute({ email, password });
    return response.send(authenticate);
  }
}

export { AuthenticateUserController };

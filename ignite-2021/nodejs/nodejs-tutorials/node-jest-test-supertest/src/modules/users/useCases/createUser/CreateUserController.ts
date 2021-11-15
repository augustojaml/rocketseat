import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({ name, email });
    return response.json(user);
  }
}
export { CreateUserController };

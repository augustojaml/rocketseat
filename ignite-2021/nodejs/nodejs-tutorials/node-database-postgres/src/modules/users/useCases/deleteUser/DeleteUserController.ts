import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = container.resolve(DeleteUserUseCase);
    await deleteUser.execute(id);
    return response.send();
  }
}

export { DeleteUserController };

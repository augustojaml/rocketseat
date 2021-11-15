import { Request, Response } from 'express';

import { DeleteUserUsecase } from './DeleteUserUsecase';

class DeleteUserController {
  constructor(private deleteUser: DeleteUserUsecase) {}
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      await this.deleteUser.execute(id);
      return response.send();
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { DeleteUserController };

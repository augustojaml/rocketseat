import { Request, Response } from 'express';

import { UpdateUserUsecase } from './UpdateUserUsecase';

class UpdateUserController {
  constructor(private updateUser: UpdateUserUsecase) {}
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;
    const user = await this.updateUser.execute({ id, name, email });
    return response.json(user);
  }
}

export { UpdateUserController };

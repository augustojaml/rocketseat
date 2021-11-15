import { Request, Response } from 'express';

import { ShowUserUsecase } from './ShowUserUsecase';

class ShowUserController {
  constructor(private showUser: ShowUserUsecase) {}
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = await this.showUser.execute(id);
    return response.json(user);
  }
}

export { ShowUserController };

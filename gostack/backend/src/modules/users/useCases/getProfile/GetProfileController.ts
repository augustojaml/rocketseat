import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetProfileUseCase } from '@modules/users/useCases/getProfile/GetProfileUseCase';

class GetProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getProfile = container.resolve(GetProfileUseCase);
    const user = await getProfile.execute(id);
    return response.json(user);
  }
}

export { GetProfileController };

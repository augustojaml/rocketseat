import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllExceptLoggedinProviderUseCase } from './FindAllExceptLoggedinProviderUseCase';

class FindAllExceptLoggedinProviderController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findAllExceptLoggedinProvider = container.resolve(FindAllExceptLoggedinProviderUseCase);

    const providers = await findAllExceptLoggedinProvider.execute(user_id);

    return response.status(201).send(providers);
  }
}

export { FindAllExceptLoggedinProviderController };

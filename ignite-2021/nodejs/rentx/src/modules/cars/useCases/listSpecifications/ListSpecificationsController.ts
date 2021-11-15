import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationsUseCase } from '@modules/cars/useCases/listSpecifications/ListSpecificationsUseCase';

class ListSpecificationsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listSpecification = container.resolve(ListSpecificationsUseCase);
    const specifications = await listSpecification.execute();
    return response.status(201).json(specifications);
  }
}

export { ListSpecificationsController };

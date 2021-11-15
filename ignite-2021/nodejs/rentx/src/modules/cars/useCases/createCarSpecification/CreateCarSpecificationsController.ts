import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationsUseCase } from './CreateCarSpecificationsUseCase';

class CreateCarSpecificationsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecifications = container.resolve(CreateCarSpecificationsUseCase);

    const carSpecifications = await createCarSpecifications.execute({
      car_id: id,
      specifications_id: specifications_id,
    });

    return response.status(201).json(carSpecifications);
  }
}

export { CreateCarSpecificationsController };

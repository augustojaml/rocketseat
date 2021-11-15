import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id: rental_id } = request.params;

    const devolutionRental = container.resolve(DevolutionRentalUseCase);
    const rental = await devolutionRental.execute({ user_id, rental_id });

    return response.status(200).json(rental);
  }
}

export { DevolutionRentalController };

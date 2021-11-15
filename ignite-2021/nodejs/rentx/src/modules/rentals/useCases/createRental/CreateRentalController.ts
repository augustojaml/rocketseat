import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase';

class CreateRentalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, expected_return_date } = request.body;
    const { id } = request.user;

    const createRental = container.resolve(CreateRentalUseCase);

    const rental = await createRental.execute({
      car_id: car_id,
      user_id: id,
      expected_return_date: expected_return_date,
    });

    return response.status(201).json({ rental });
  }
}

export { CreateRentalController };

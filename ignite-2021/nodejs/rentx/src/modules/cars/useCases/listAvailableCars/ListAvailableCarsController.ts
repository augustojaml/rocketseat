import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase';

class ListAvailableCarsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;
    const listCar = container.resolve(ListAvailableCarsUseCase);
    const cars = await listCar.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });
    return response.json(cars);
  }
}

export { ListAvailableCarsController };

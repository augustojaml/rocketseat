import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableMothProviderUseCase } from '@modules/appointments/useCases/ListAvailableMothProvider/ListAvailableMothProviderUseCase';
import { ListAvailableMothProviderValidate } from '@modules/appointments/validate/ListAvailableMothProviderValidate';

class ListAvailableMothProviderController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    await ListAvailableMothProviderValidate.handle({ provider_id, month: Number(month), year: Number(year) });

    const listOfAvailableMonthUseCase = container.resolve(ListAvailableMothProviderUseCase);

    const listOfAvailable = await listOfAvailableMonthUseCase.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.status(201).json(listOfAvailable);
  }
}

export { ListAvailableMothProviderController };

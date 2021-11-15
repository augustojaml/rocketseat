import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableDayProviderValidate } from '@modules/appointments/validate/ListAvailableDayProviderValidate';

import { ListAvailableDayProviderUseCase } from './ListAvailableDayProviderUseCase';

class ListAvailableDayProviderController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    await ListAvailableDayProviderValidate.handle({ provider_id, day: Number(day), month: Number(month), year: Number(year) });

    const listOfAvailableMonthUseCase = container.resolve(ListAvailableDayProviderUseCase);

    const listOfAvailable = await listOfAvailableMonthUseCase.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.status(201).json(listOfAvailable);
  }
}

export { ListAvailableDayProviderController };

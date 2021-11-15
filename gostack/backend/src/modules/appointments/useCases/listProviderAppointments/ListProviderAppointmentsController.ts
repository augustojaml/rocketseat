import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProviderAppointmentsValidate } from '@modules/appointments/validate/ListProviderAppointmentsValidate';

import { ListProviderAppointmentsUseCase } from './ListProviderAppointmentsUseCase';

class ListProviderAppointmentsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    await ListProviderAppointmentsValidate.handle({ provider_id, day: Number(day), month: Number(month), year: Number(year) });

    const listProviderAppointmentsUserCase = container.resolve(ListProviderAppointmentsUseCase);

    const listProviderAppointments = await listProviderAppointmentsUserCase.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.status(201).json(listProviderAppointments);
  }
}

export { ListProviderAppointmentsController };

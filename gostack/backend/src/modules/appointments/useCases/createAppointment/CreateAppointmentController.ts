import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAppointmentValidate } from '@modules/appointments/validate/CreateAppointmentValidate';

import { CreateAppointmentUseCase } from './CreateAppointmentUseCase';

class CreateAppointmentController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    await CreateAppointmentValidate.handle({ user_id, provider_id, date });

    const createAppointment = container.resolve(CreateAppointmentUseCase);
    const appointment = await createAppointment.execute({ user_id, provider_id, date });
    return response.status(201).json(appointment);
  }
}

export { CreateAppointmentController };

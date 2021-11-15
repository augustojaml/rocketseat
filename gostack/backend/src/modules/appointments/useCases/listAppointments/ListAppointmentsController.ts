import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAppointmentsUseCase } from './ListAppointmentsUseCase';

class ListAppointmentsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const appointmentsUseCase = container.resolve(ListAppointmentsUseCase);
    const appointments = await appointmentsUseCase.execute();
    return response.status(200).json(appointments);
  }
}

export { ListAppointmentsController };

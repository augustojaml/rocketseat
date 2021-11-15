import { Router } from 'express';

import { EnsureAuthenticate } from '@shared/infra/middlewares/EnsureAuthenticate';

import { CreateAppointmentController } from '../useCases/createAppointment/CreateAppointmentController';
import { ListAppointmentsController } from '../useCases/listAppointments/ListAppointmentsController';
import { ListProviderAppointmentsController } from '../useCases/listProviderAppointments/ListProviderAppointmentsController';

const appointmentsRouter = Router();

const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentsController();
const listProviderAppointmentsController = new ListProviderAppointmentsController();

appointmentsRouter.post('/', EnsureAuthenticate.forUser, createAppointmentController.handle);
appointmentsRouter.get('/', EnsureAuthenticate.forUser, listAppointmentsController.handle);
appointmentsRouter.get('/me', EnsureAuthenticate.forUser, listProviderAppointmentsController.handle);

export { appointmentsRouter };

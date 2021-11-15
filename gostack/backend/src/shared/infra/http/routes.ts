import { Router } from 'express';

import { appointmentsRouter } from '@modules/appointments/router/appointmentsRouter';
import { providersRouter } from '@modules/appointments/router/providersRouter';
import { usersRouter } from '@modules/users/router/usersRouter';

const routes = Router();

routes.use('/accounts', usersRouter);

routes.use('/appointments', appointmentsRouter);

routes.use('/providers', providersRouter);

export { routes };

import { Router } from 'express';

import { categoriesRoutes } from '@shared/infra/http/routes/categories.routes';
import { specificationsRoutes } from '@shared/infra/http/routes/specification.routes';
import { usersRoutes } from '@shared/infra/http/routes/users.routes';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { passwordsRoutes } from './password.routes';
import { rentalsRoutes } from './rental.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/cars', carsRoutes);

routes.use('/accounts', usersRoutes);
routes.use('/accounts', authenticateRoutes);
routes.use('/accounts', passwordsRoutes);

routes.use('/rentals', rentalsRoutes);

export { routes };

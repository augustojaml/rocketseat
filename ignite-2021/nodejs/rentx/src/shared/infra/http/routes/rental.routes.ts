import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalByUser/ListRentalsByUserController';
import { ensureIsAuthenticated } from '@shared/infra/http/middleware/ensureIsAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureIsAuthenticated, createRentalController.handle);
rentalsRoutes.post('/devolution/:id', ensureIsAuthenticated, devolutionRentalController.handle);
rentalsRoutes.get('/user', ensureIsAuthenticated, listRentalsByUserController.handle);

export { rentalsRoutes };

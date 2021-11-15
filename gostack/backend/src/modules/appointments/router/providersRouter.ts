import { Router } from 'express';

import { FindAllExceptLoggedinProviderController } from '@modules/appointments/useCases/findAllExceptLoggedinProvider/FindAllExceptLoggedinProviderController';
import { ListAvailableDayProviderController } from '@modules/appointments/useCases/ListAvailableDayProvider/ListAvailableDayProviderController';
import { ListAvailableMothProviderController } from '@modules/appointments/useCases/ListAvailableMothProvider/ListAvailableMothProviderController';
import { EnsureAuthenticate } from '@shared/infra/middlewares/EnsureAuthenticate';

const providersRouter = Router();

const findAllProvidersExceptLoggedinController = new FindAllExceptLoggedinProviderController();
const listAvailableMothProviderController = new ListAvailableMothProviderController();
const listAvailableDayProviderController = new ListAvailableDayProviderController();

providersRouter.get('/', EnsureAuthenticate.forUser, findAllProvidersExceptLoggedinController.handle);
providersRouter.get('/:provider_id/available-month', listAvailableMothProviderController.handle);
providersRouter.get('/:provider_id/available-day', listAvailableDayProviderController.handle);

export { providersRouter };

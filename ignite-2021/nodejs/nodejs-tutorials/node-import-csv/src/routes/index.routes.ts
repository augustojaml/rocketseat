import { Router } from 'express';

import { importCSVRoute } from './importcsv.routes';

const routes = Router();

routes.use('/import', importCSVRoute);

export { routes };

import { Request, Response, Router } from 'express';

import { usersRoutes } from './users.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.json({ message: 'NodeJS, typescript Authenticate User' });
});

routes.use('/users', usersRoutes);

export { routes };

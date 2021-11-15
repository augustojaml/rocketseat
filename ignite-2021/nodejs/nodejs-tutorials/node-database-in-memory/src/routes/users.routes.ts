import { Request, Response, Router } from 'express';

import { createUserController } from '../modules/users/useCases/createUser';
import { deleteUseController } from '../modules/users/useCases/deleteUser';
import { listUsersController } from '../modules/users/useCases/listUser';
import { showUserController } from '../modules/users/useCases/showUser';
import { updateUserController } from '../modules/users/useCases/updateUser';

const usersRoutes = Router();

usersRoutes.get('/', (request: Request, response: Response) => {
  return listUsersController.handle(request, response);
});

usersRoutes.get('/:id', (request: Request, response: Response) => {
  return showUserController.handle(request, response);
});

usersRoutes.post('/', (request: Request, response: Response) => {
  return createUserController.handle(request, response);
});

usersRoutes.put('/:id', (request: Request, response: Response) => {
  return updateUserController.handle(request, response);
});

usersRoutes.delete('/:id', (request: Request, response: Response) => {
  return deleteUseController.handle(request, response);
});

export { usersRoutes };

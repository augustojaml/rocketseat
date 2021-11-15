import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { Router } from 'express';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUserController.handle);

export { usersRoutes };

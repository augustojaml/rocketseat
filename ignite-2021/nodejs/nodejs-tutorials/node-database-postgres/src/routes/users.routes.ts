import { Router } from 'express';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { DeleteUserController } from '../modules/users/useCases/deleteUser/DeleteUserController';
import { ListUsersController } from '../modules/users/useCases/listUsers/ListUsersController';
import { ShowUserController } from '../modules/users/useCases/showUser/ShowUserController';
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUserController.handle);
usersRoutes.get('/:id', showUserController.handle);
usersRoutes.put('/:id', updateUserController.handle);
usersRoutes.delete('/:id', deleteUserController.handle);

export { usersRoutes };

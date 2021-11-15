import { Router } from 'express';
import multer from 'multer';

import { uploadFile } from '@config/files';
import { storage } from '@config/storage';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/accounts/useCases/ListUser/ListUsersController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUserUseCase/ProfileUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureIsAuthenticated } from '@shared/infra/http/middleware/ensureIsAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUsersController.handle);
usersRoutes.get('/profile', ensureIsAuthenticated, profileUserController.handle);

const upload = multer(uploadFile(storage.storage));

usersRoutes.patch('/avatar', ensureIsAuthenticated, upload.single('avatar'), updateUserAvatarController.handle);

export { usersRoutes };

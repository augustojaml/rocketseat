import { Router } from 'express';
import multer from 'multer';

import { uploadFile } from '@config/files';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { UploadPhotosController } from '@modules/users/useCases/uploadPhotos/UploadPhotosController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const uploadPhotosController = new UploadPhotosController();

const upload = multer(uploadFile('storage/photos'));

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUsersController.handle);
usersRoutes.post('/images/:id', upload.array('photos'), uploadPhotosController.handle);

export { usersRoutes };

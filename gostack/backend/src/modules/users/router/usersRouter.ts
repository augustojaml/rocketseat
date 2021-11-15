import { Router } from 'express';
import multer from 'multer';

import { EnsureAuthenticate } from '@shared/infra/middlewares/EnsureAuthenticate';
import { StorageSupport } from '@support/StorageSupport';

import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { GetProfileController } from '../useCases/getProfile/GetProfileController';
import { RecoverPasswordController } from '../useCases/recoverPassword/RecoverPasswordController';
import { ResetPasswordController } from '../useCases/resetPassword/ResetPasswordController';
import { SendForgotPasswordMailController } from '../useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { UpdateAvatarController } from '../useCases/updateAvatar/UpdateAvatarController';

const usersRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateAvatarController = new UpdateAvatarController();
const getProfileController = new GetProfileController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const recoverPasswordController = new RecoverPasswordController();
const resetPasswordController = new ResetPasswordController();

const upload = multer(StorageSupport.upload(`${StorageSupport.paths.storage}/avatar`));

usersRouter.post('/', createUserController.handle);
usersRouter.post('/authenticate', authenticateUserController.handle);

usersRouter.patch('/avatar', EnsureAuthenticate.forUser, upload.single('avatar'), updateAvatarController.handle);
usersRouter.get('/profile', EnsureAuthenticate.forUser, getProfileController.handle);

usersRouter.post('/forgot', sendForgotPasswordMailController.handle);
usersRouter.post('/recover', recoverPasswordController.handle);
usersRouter.post('/reset', EnsureAuthenticate.forUser, resetPasswordController.handle);

export { usersRouter };

import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { RefreshTokenController } from '@modules/users/useCases/refreshToken/RefreshTokenController';
import { ResetPasswordController } from '@modules/users/useCases/resetPassword/ResetPasswordController';
import { SendForgotPasswordMailController } from '@modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUserController.handle);
usersRoutes.post('/authenticate', authenticateUserController.handle);
usersRoutes.post('/refresh', refreshTokenController.handle);
usersRoutes.post('/forgot', sendForgotPasswordMailController.handle);
usersRoutes.post('/reset', resetPasswordController.handle);

export { usersRoutes };

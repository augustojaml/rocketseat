import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUsecase } from './UpdateUserUsecase';

const usersRepository = UsersRepository.getInstance();
const updateUser = new UpdateUserUsecase(usersRepository);
const updateUserController = new UpdateUserController(updateUser);

export { updateUserController };

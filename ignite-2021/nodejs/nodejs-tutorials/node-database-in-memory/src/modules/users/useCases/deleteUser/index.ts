import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUsecase } from './DeleteUserUsecase';

const useRepository = UsersRepository.getInstance();
const deleteUserUsecase = new DeleteUserUsecase(useRepository);
const deleteUseController = new DeleteUserController(deleteUserUsecase);

export { deleteUseController };

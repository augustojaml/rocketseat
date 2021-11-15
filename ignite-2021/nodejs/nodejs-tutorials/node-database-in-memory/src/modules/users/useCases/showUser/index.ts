import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { ShowUserController } from './ShowUserController';
import { ShowUserUsecase } from './ShowUserUsecase';

const usersRepository = UsersRepository.getInstance();
const showUser = new ShowUserUsecase(usersRepository);
const showUserController = new ShowUserController(showUser);

export { showUserController };

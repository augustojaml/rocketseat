import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { ListUsersController } from './ListUsersController';
import { ListUsersUsecase } from './ListUsersUsecase';

const usersRepository = UsersRepository.getInstance();
const listUsersUserCase = new ListUsersUsecase(usersRepository);
const listUsersController = new ListUsersController(listUsersUserCase);

export { listUsersController };

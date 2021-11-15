import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUsecase } from './CreateUserUsecase';

const usersRepository = UsersRepository.getInstance();
const createUserUsecase = new CreateUserUsecase(usersRepository);
const createUserController = new CreateUserController(createUserUsecase);

export { createUserController };

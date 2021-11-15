import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUseUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticated User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should not be able authenticate user with no-existing user', async () => {
    await createUserUseCase.execute({
      name: 'new-user-1',
      password: 'password-1',
      email: 'new-user-1@test',
      drive_license: '123456',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'non-existent-user@test',
        password: 'password-1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able authenticate user with invalid password', async () => {
    await createUserUseCase.execute({
      name: 'new-user-1',
      password: 'password-1',
      email: 'new-user-1@test',
      drive_license: '123456',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'new-user-1@test',
        password: 'no-existent-password-1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able authenticate user', async () => {
    await createUserUseCase.execute({
      name: 'new-user-1',
      password: 'password-1',
      email: 'new-user-1@test',
      drive_license: '123456',
    });

    const auth = await authenticateUserUseCase.execute({
      email: 'new-user-1@test',
      password: 'password-1',
    });
    expect(auth).toHaveProperty('token');
    expect(auth).toHaveProperty('refresh_token');
  });
});

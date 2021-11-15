import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUseUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticated User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should not be able create user with existent email', async () => {
    await createUserUseCase.execute({
      name: 'new-user-1',
      password: 'password-1',
      email: 'new-user-1@test',
      drive_license: '123456',
    });

    await expect(
      createUserUseCase.execute({
        name: 'new-user-2',
        password: 'password-2',
        email: 'new-user-1@test',
        drive_license: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create 2 or more new user', async () => {
    const user1 = await createUserUseCase.execute({
      name: 'new-user-1',
      password: 'password-1',
      email: 'new-user-1@test',
      drive_license: '123456',
    });
    const user2 = await createUserUseCase.execute({
      name: 'new-user-1',
      password: 'password-1',
      email: 'new-user-2@test',
      drive_license: '123456',
    });

    const users = await usersRepositoryInMemory.all();

    expect(users).toEqual(expect.arrayContaining([user1, user2]));
  });
});

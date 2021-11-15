import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
  });

  it('Should not be be able to create a new user with email existent', async () => {
    await createUserUseCase.execute({
      name: 'user-1',
      email: 'user-1@test',
    });

    await expect(
      createUserUseCase.execute({
        name: 'user-2',
        email: 'user-1@test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be be able to create a new user', async () => {
    const user1 = await createUserUseCase.execute({
      name: 'user-1',
      email: 'user-1@test',
    });

    expect(user1).toEqual(expect.objectContaining({ name: 'user-1', email: 'user-1@test' }));
  });
});

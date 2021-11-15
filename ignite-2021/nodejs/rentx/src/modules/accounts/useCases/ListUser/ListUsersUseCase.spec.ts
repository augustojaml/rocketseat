import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { ListUsersUseCase } from './LIstUsersUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let listUsersUseCase: ListUsersUseCase;

describe('List User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it('Should be able to list all users', async () => {
    const user1 = await usersRepositoryInMemory.create({
      name: 'new-user-1',
      password: 'password-1',
      email: 'new-user-1@test',
      drive_license: '123456',
    });
    const user2 = await usersRepositoryInMemory.create({
      name: 'new-user-2',
      password: 'password-2',
      email: 'new-user-2@test',
      drive_license: '123456',
    });

    const users = await listUsersUseCase.execute();

    expect(users).toEqual(expect.arrayContaining([user1, user2]));
  });
});

import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { ListUsersUseCase } from '@modules/users/useCases/listUsers/ListUsersUseCase';

let fakeUsersRepository: FakeUsersRepository;
let listUsersUseCase: ListUsersUseCase;

describe('List Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsersUseCase = new ListUsersUseCase(fakeUsersRepository);
  });

  it('Should be able to list all users', async () => {
    await fakeUsersRepository.create({
      name: 'user-1',
      email: 'user-1@test',
    });
    await fakeUsersRepository.create({
      name: 'user-2',
      email: 'user-2@test',
    });
    await fakeUsersRepository.create({
      name: 'user-3',
      email: 'user-3@test',
    });

    const users = await listUsersUseCase.execute();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'user-1', email: 'user-1@test' }),
        expect.objectContaining({ name: 'user-2', email: 'user-2@test' }),
        expect.objectContaining({ name: 'user-3', email: 'user-3@test' }),
      ]),
    );
  });
});

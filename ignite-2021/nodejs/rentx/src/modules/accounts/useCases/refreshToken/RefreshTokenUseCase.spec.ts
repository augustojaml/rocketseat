import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { AuthenticateUserUseCase } from '../authenticationUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUseUseCase';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;

describe('Refresh Token', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    refreshTokenUseCase = new RefreshTokenUseCase(usersTokensRepositoryInMemory, dayjsDateProvider);
  });

  it('Should not be able of refresh token with invalid refresh token', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ldy11c2VyLTFAdGVzdCIsImlhdCI6MTYzMzgzMzgxOCwiZXhwIjoxNjM2NDI1ODE4LCJzdWIiOiJjNzA4MmEyZC1jYWIzLTQ1MWItYjEyOS1mMWYxMTBlM2M5M2UifQ.EaSqS5OULkTNeSkG13lsvIXcILp9CdSzHwyOiGH8Ylo';

    await expect(refreshTokenUseCase.execute(token)).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able of refresh token', async () => {
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

    await refreshTokenUseCase.execute(auth.refresh_token);

    // expect(await refreshTokenUseCase.execute(auth.refresh_token)).rejects.toBeInstanceOf(AppError);
  });
});

import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { AuthenticateUserUseCase } from '../authenticationUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUseUseCase';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let resetPasswordUseCase: ResetPasswordUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Reset Password', () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    resetPasswordUseCase = new ResetPasswordUseCase(usersTokensRepositoryInMemory, dayjsDateProvider, usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should not be able to reset password', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ldy11c2VyLTFAdGVzdCIsImlhdCI6MTYzMzgzMzgxOCwiZXhwIjoxNjM2NDI1ODE4LCJzdWIiOiJjNzA4MmEyZC1jYWIzLTQ1MWItYjEyOS1mMWYxMTBlM2M5M2UifQ.EaSqS5OULkTNeSkG13lsvIXcILp9CdSzHwyOiGH8Ylo';

    await expect(resetPasswordUseCase.execute({ token, password: 'password-1' })).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to reset password', async () => {
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
    await expect(resetPasswordUseCase.execute({ token: auth.refresh_token, password: 'new-password-1' })).not.toBeInstanceOf(AppError);
  });
});

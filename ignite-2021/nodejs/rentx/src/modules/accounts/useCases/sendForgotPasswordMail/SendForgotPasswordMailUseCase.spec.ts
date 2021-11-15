import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { EtherealMailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/EtherealMailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let etherealMailProviderInMemory: EtherealMailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send Forgot Password', () => {
  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    etherealMailProviderInMemory = new EtherealMailProviderInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      dayjsDateProvider,
      usersTokensRepositoryInMemory,
      etherealMailProviderInMemory,
    );
  });

  it('Should not be able to send a forgot password mail to user no-existent', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('email-user-1')).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(etherealMailProviderInMemory, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'name-user-1',
      password: 'password-user-1',
      email: 'email-user-1',
      drive_license: 'drive-license-user-1',
    });

    await sendForgotPasswordMailUseCase.execute('email-user-1');

    expect(sendMail).toHaveBeenCalled();
  });
});

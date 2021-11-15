import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(email: string): Promise<void> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('User does not exists');
    }

    const emailToken = uuidV4();
    const expires_date = this.dayjsDateProvider.addHours(3);
    const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');

    await this.usersTokensRepository.create({
      refresh_token: emailToken,
      user_id: findUser.id,
      expires_date: expires_date,
    });

    const variables = {
      name: findUser.name,
      link: `${process.env.FORGOT_MAIL_URL}${emailToken}`,
    };

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      variables: variables,
      templatePath: templatePath,
    });
  }
}

export { SendForgotPasswordMailUseCase };

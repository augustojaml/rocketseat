import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/infra/middlewares/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

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

    const findUsersToken = await this.usersTokensRepository.findUsersTokensByUserId(findUser.id);

    if (findUsersToken) {
      await this.usersTokensRepository.deleteById(findUsersToken.id);
    }

    const usersTokens = await this.usersTokensRepository.create({
      type: 'uuid',
      refresh_token: uuidV4(),
      user_id: findUser.id,
      expire_date: this.dateProvider.addHours(3),
    });

    await this.mailProvider.sendMail({
      to: email,
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      subject: 'Recover password',
      variables: {
        name: findUser.name,
        link: `${process.env.APP_URL_FORGOT_MAIL}${usersTokens.refresh_token}`,
        token: usersTokens.refresh_token,
      },
      templatePath: resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs'),
    });
  }
}

export { SendForgotPasswordMailUseCase };

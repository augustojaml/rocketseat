import { resolve } from 'path';
import { CustomDate } from 'supports/CustomDate';
import { EtherealMail } from 'supports/EtherealMail';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('User does not exists');
    }

    const emailToken = uuidV4();
    const expires_date = CustomDate.addHours(1);
    const templatePath = resolve(__dirname, '..', '..', 'views', 'forgotPassword.hbs');

    await this.usersTokensRepository.create({
      refresh_token: emailToken,
      user_id: findUser.id,
      expires_date: expires_date,
    });

    const variables = {
      name: findUser.name,
      // OBS IN PRODUCTION USE .env for http://localhost:3333/accounts/reset?token
      link: `http://localhost:3333/accounts/reset?token=${emailToken}`,
    };

    await EtherealMail.mail({
      to: email,
      subject: 'Recuperação de senha',
      variables: variables,
      templatePath: templatePath,
    });
  }
}

export { SendForgotPasswordMailUseCase };

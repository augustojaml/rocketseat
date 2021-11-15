import { container } from 'tsyringe';

import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

import { SESEmailProvider } from './implementations/SESEmailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESEmailProvider),
};

container.registerInstance<IMailProvider>('MailProvider', mailProvider[process.env.APP_MAIL_PROVIDER]);

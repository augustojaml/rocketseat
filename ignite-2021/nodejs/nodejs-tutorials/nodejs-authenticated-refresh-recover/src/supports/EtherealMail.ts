import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProviderDTO } from './dtos/IMailProviderDTO';

@injectable()
class EtherealMail {
  public static async mail({ to, subject, variables, templatePath }: IMailProviderDTO): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const templateFileContent = fs.readFileSync(templatePath).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    const client = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await client.sendMail({
      to: to,
      from: 'Rentalx <noreplay@test>',
      subject: subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMail };

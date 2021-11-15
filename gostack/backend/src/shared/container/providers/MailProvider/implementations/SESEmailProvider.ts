import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider, IMailProviderDTO } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/infra/middlewares/errors/AppError';

@injectable()
class SESEmailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.createClient();
  }

  private async createClient() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_MAIL_REGION,
      }),
    });
  }

  public async sendMail({ to, subject, from, variables, templatePath }: IMailProviderDTO): Promise<void> {
    if (!this.client) {
      await this.createClient();
    }

    const templateFileContent = fs.readFileSync(templatePath).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    try {
      await this.client.sendMail({
        to: to,
        from: from,
        subject: subject,
        html: templateHTML,
      });
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export { SESEmailProvider };

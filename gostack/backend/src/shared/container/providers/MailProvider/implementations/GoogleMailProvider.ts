import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { AppError } from '@shared/infra/middlewares/errors/AppError';

import { IMailProvider, IMailProviderDTO } from '../IMailProvider';

@injectable()
class GoogleMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.createClient();
  }

  private async createClient() {
    try {
      // const account = await nodemailer.createTestAccount();

      this.client = nodemailer.createTransport({
        host: process.env.GOOGLE_MAIL_HOST,
        port: process.env.GOOGLE_MAIL_PORT,
        secure: process.env.GOOGLE_MAIL_SECURE,
        auth: {
          user: process.env.GOOGLE_MAIL_USER,
          pass: process.env.GOOGLE_MAIL_PASS,
        },
      });
    } catch (err) {
      throw new Error(`GoogleMailProvider - Error:\n${err}`);
    }
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

export { GoogleMailProvider };

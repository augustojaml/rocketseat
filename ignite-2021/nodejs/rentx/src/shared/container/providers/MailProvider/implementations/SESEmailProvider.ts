import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider, IMailProviderDTO } from '../IMailProvider';

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
        region: process.env.AWS_REGION,
      }),
    });
  }

  public async sendMail({ to, subject, variables, templatePath }: IMailProviderDTO): Promise<void> {
    if (!this.client) {
      await this.createClient();
    }

    const templateFileContent = fs.readFileSync(templatePath).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to: to,
      from: 'Rentalx <augusto.monteiro@augustojaml.com>',
      subject: subject,
      html: templateHTML,
    });
  }
}

export { SESEmailProvider };

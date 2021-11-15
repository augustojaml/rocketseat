import { IMailProvider, IMailProviderDTO } from '../IMailProvider';

class EtherealMailProviderInMemory implements IMailProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private message: any[] = [];

  public async sendMail({ to, subject, variables, templatePath }: IMailProviderDTO): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      templatePath,
    });
  }
}

export { EtherealMailProviderInMemory };

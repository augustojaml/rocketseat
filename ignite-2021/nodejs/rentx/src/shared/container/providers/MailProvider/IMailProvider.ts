export interface IMailProviderDTO {
  to: string;
  subject: string;
  variables: any;
  templatePath: string;
}

interface IMailProvider {
  sendMail({ to, subject, variables, templatePath }: IMailProviderDTO): Promise<void>;
}

export { IMailProvider };

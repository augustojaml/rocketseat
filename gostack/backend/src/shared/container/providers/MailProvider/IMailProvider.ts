/* eslint-disable @typescript-eslint/no-explicit-any */

interface IVariables {
  name: string;
  link: string;
  token?: string;
}

export interface IMailProviderDTO {
  to: string;
  from: string;
  subject: string;
  variables: IVariables;
  templatePath: string;
}

interface IMailProvider {
  sendMail({ to, subject, from, variables, templatePath }: IMailProviderDTO): Promise<void>;
}

export { IMailProvider };

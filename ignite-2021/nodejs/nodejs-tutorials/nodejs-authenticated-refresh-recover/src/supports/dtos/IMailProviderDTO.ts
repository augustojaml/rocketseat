interface IMailProviderDTO {
  to: string;
  subject: string;
  variables: any;
  templatePath: string;
}

export { IMailProviderDTO };

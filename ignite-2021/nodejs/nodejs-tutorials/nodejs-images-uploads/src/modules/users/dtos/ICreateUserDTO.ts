import { Photo } from '../infra/typeorm/entities/Photo';

interface ICreateUsersDTO {
  id?: string;
  name: string;
  email: string;
  photos?: Photo[];
}
export { ICreateUsersDTO };

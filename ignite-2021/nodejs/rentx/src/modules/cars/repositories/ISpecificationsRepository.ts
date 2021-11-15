import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

import { Specification } from '../infra/typeorm/entities/Specification';

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };

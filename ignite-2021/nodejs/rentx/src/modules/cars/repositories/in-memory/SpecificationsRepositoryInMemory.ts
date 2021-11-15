import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private repository: Specification[] = [];

  public async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.find(specification => specification.name === name);
    return specification;
  }
  public async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });
    this.repository.push(specification);

    return specification;
  }
  public async list(): Promise<Specification[]> {
    const specifications = await this.repository;
    return specifications;
  }
  public async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.filter(specification => ids.includes(specification.id));
    return specifications;
  }
}

export { SpecificationsRepositoryInMemory };

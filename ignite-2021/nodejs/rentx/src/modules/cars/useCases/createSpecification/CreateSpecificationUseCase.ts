import { inject, injectable } from 'tsyringe';

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private repository: ISpecificationsRepository,
  ) {}

  public async execute({ name, description }: ICreateSpecificationDTO): Promise<Category> {
    const categoryAlreadyExists = await this.repository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }

    const category = await this.repository.create({
      name,
      description,
    });

    return category;
  }
}

export { CreateSpecificationUseCase };

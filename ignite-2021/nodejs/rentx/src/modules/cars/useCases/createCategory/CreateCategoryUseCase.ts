import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {}

  public async execute({ name, description }: ICreateCategoryDTO): Promise<Category> {
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

export { CreateCategoryUseCase };

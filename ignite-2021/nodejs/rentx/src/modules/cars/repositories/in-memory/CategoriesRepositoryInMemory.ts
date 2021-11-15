import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findByName(name: string): Promise<Category> {
    const category = await this.categories.find(category => category.name === name);
    return category;
  }

  public async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();
    Object.assign(category, { name, description });
    this.categories.push(category);
    return category;
  }
  public async list(): Promise<Category[]> {
    const { categories } = this;
    return categories;
  }
}

export { CategoriesRepositoryInMemory };

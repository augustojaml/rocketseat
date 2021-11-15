import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('Should be able to create a new Category', async () => {
    const newCategory1 = await createCategoryUseCase.execute({
      name: 'new-category-1',
      description: 'new-description-1',
    });
    expect(newCategory1).toHaveProperty('id');
  });

  it('should not be able to create a category with an existing name', async () => {
    await createCategoryUseCase.execute({
      name: 'new-category-1',
      description: 'new-description-1',
    });

    await expect(
      createCategoryUseCase.execute({
        name: 'new-category-1',
        description: 'new-description-1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

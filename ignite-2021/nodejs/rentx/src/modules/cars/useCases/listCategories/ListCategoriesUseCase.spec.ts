import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listCategoriesUseCase: ListCategoriesUseCase;

describe('List Categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepositoryInMemory);
  });

  it('Should be able list all categories', async () => {
    await categoriesRepositoryInMemory.create({
      name: 'category-1',
      description: 'description',
    });
    await categoriesRepositoryInMemory.create({
      name: 'category-2',
      description: 'description',
    });

    const categories = await listCategoriesUseCase.execute();

    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'category-1', description: 'description' }),
        expect.objectContaining({ name: 'category-2', description: 'description' }),
      ]),
    );
  });
});

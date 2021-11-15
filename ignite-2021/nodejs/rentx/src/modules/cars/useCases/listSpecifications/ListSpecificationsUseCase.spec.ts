import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let listSpecificationsUseCase: ListSpecificationsUseCase;

describe('List Specifications', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    listSpecificationsUseCase = new ListSpecificationsUseCase(specificationsRepositoryInMemory);
  });

  it('Should be able list all categories', async () => {
    await specificationsRepositoryInMemory.create({
      name: 'specification-1',
      description: 'description',
    });
    await specificationsRepositoryInMemory.create({
      name: 'specification-2',
      description: 'description',
    });

    const specifications = await listSpecificationsUseCase.execute();

    expect(specifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'specification-1', description: 'description' }),
        expect.objectContaining({ name: 'specification-2', description: 'description' }),
      ]),
    );
  });
});

import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepositoryInMemory);
  });

  it('Should be able to create a new Specification', async () => {
    const newSpecification1 = await createSpecificationUseCase.execute({
      name: 'new-specification-1',
      description: 'new-description-1',
    });
    expect(newSpecification1).toHaveProperty('id');
  });

  it('should not be able to create a specification with an existing name', async () => {
    await createSpecificationUseCase.execute({
      name: 'new-specification-1',
      description: 'new-description-1',
    });

    await expect(
      createSpecificationUseCase.execute({
        name: 'new-specification-1',
        description: 'new-description-1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationsUseCase } from './CreateCarSpecificationsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });

  it('Should not be able to create car specification with no-existent car', async () => {
    await expect(
      createCarSpecificationsUseCase.execute({
        car_id: 'no-existent-car-id',
        specifications_id: ['no-existent-specification-id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create car specification with no-existent specification', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'car-name1',
      description: 'car-description1',
      daily_rate: 100,
      license_plate: 'car-license_plate1',
      fine_amount: 10,
      brand: 'car-brand',
      category_id: 'car-category_id',
    });

    await createCarSpecificationsUseCase.execute({
      car_id: car1.id,
      specifications_id: ['no-existent-specification-id'],
    });
  });

  it('Should be able to create car specification', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'car-name1',
      description: 'car-description1',
      daily_rate: 100,
      license_plate: 'car-license_plate1',
      fine_amount: 10,
      brand: 'car-brand',
      category_id: 'car-category_id',
    });

    const newSpecification1 = await specificationsRepositoryInMemory.create({
      name: 'new-specification-1',
      description: 'new-description-1',
    });

    const newSpecification2 = await specificationsRepositoryInMemory.create({
      name: 'new-specification-2',
      description: 'new-description-1',
    });

    const carSpecifications = await createCarSpecificationsUseCase.execute({
      car_id: car1.id,
      specifications_id: [newSpecification1.id, newSpecification2.id],
    });

    expect(carSpecifications).toEqual(
      expect.objectContaining({
        name: 'car-name1',
        description: 'car-description1',
      }),
    );
  });
});

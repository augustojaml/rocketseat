import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Available Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able list all available cars', async () => {
    await carsRepositoryInMemory.create({
      name: 'car-name-1',
      description: 'car-description',
      daily_rate: 100,
      license_plate: 'car -license_plate-1',
      fine_amount: 10,
      brand: 'car-brand',
      category_id: 'car-category_id',
    });
    const car2 = await carsRepositoryInMemory.create({
      name: 'car-name-2',
      description: 'car-description',
      daily_rate: 100,
      license_plate: 'car -license_plate-2',
      fine_amount: 10,
      brand: 'car-brand',
      category_id: 'car-category_id',
    });
    car2.available = false;

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'car-name-1', description: 'car-description' })]));
  });
});

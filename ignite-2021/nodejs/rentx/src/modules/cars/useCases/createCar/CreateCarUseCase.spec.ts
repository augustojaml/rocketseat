import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase';
import { AppError } from '@shared/errors/AppError';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should not be able create car with existent license plate', async () => {
    await createCarUseCase.execute({
      name: 'car-name1',
      description: 'car-description1',
      daily_rate: 100,
      license_plate: 'car-license_plate1',
      fine_amount: 10,
      brand: 'car-brand',
      category_id: 'car-category_id',
    });

    await expect(
      createCarUseCase.execute({
        name: 'car-name2',
        description: 'car-description2',
        daily_rate: 100,
        license_plate: 'car-license_plate1',
        fine_amount: 10,
        brand: 'car-brand',
        category_id: 'car-category_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'car-name',
      description: 'car-description',
      daily_rate: 100,
      license_plate: 'car -license_plate',
      fine_amount: 10,
      brand: 'car-brand',
      category_id: 'car-category_id',
    });
    expect(car).toHaveProperty('id');
  });
});

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListCarsDTO } from '@modules/cars/dtos/IListCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private repository: Car[] = [];

  public async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, { name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications });
    this.repository.push(car);
    return car;
  }
  public async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.find(car => car.license_plate === license_plate);
    return car;
  }

  public async findAllAvailable({ name, brand, category_id }: IListCarsDTO): Promise<Car[]> {
    const carsAvailable = await this.repository.filter(car => {
      if (
        car.available === true ||
        (name && car.name === name) ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id)
      ) {
        return car;
      }
      return null;
    });

    return carsAvailable;
  }

  public async findById(id: string): Promise<Car> {
    const car = await this.repository.find(car => car.id === id);
    return car;
  }

  public async updateAvailable(car_id: string, available: boolean): Promise<void> {
    const findIndex = await this.repository.findIndex(car => car.id === car_id);
    this.repository[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };

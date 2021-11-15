import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository,
  ) {}

  public async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
    const findCar = await this.repository.findByLicensePlate(license_plate);

    if (findCar) {
      throw new AppError('Car already exists');
    }

    const car = this.repository.create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id });

    return car;
  }
}

export { CreateCarUseCase };

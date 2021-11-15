import { inject, injectable } from 'tsyringe';

import { ICreateCarSpecificationsDTO } from '@modules/cars/dtos/ICreateCarSpecificationsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCarSpecificationsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository,
  ) {}

  public async execute({ car_id, specifications_id }: ICreateCarSpecificationsDTO): Promise<Car> {
    const findCar = await this.carsRepository.findById(car_id);

    if (!findCar) {
      throw new AppError('Car does not exists');
    }

    const findSpecification = await this.specificationRepository.findByIds(specifications_id);

    if (!findSpecification) {
      throw new AppError('Specification does not exists');
    }

    findCar.specifications = findSpecification;

    await this.carsRepository.create(findCar);
    return findCar;
  }
}

export { CreateCarSpecificationsUseCase };

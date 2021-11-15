import { inject, injectable } from 'tsyringe';

import { devolution } from '@config/devolution';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  public async execute({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const findCar = await this.carsRepository.findById(car_id);
    if (!findCar) {
      throw new AppError("car doesn't exist");
    }

    const findAvailableCar = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (findAvailableCar) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError('User is unavailable');
    }

    const compare = this.dayjsDateProvider.compareInHours(this.dayjsDateProvider.dateNow(), expected_return_date);

    if (compare < devolution.minimumHours) {
      throw new AppError('Invalid return time');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };

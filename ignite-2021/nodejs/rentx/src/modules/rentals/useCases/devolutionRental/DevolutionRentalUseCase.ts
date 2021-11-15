import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IDevolutionRentalDTO } from '@modules/rentals/dtos/IDevolutionDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ rental_id }: IDevolutionRentalDTO): Promise<Rental> {
    const findRental = await this.rentalsRepository.findById(rental_id);
    const findCar = await this.carsRepository.findById(findRental.car_id);

    if (!findRental) {
      throw new AppError('Rental does not exists');
    }

    let daily = this.dayjsDateProvider.compareInDays(findRental.start_date, this.dayjsDateProvider.dateNow());

    if (daily <= 0) {
      daily = 1;
    }

    const delay = this.dayjsDateProvider.compareInDays(this.dayjsDateProvider.dateNow(), findRental.expected_return_date);

    let total_calculate_fine = 0;

    if (delay < 0) {
      total_calculate_fine = delay * findCar.fine_amount;
    }

    total_calculate_fine += daily * findCar.daily_rate;

    findRental.end_date = this.dayjsDateProvider.dateNow();
    findRental.total = total_calculate_fine;

    await this.rentalsRepository.create(findRental);
    await this.carsRepository.updateAvailable(findCar.id, true);

    return findRental;
  }
}

export { DevolutionRentalUseCase };

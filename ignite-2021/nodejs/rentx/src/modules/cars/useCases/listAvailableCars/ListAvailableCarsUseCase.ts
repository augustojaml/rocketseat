import { inject, injectable } from 'tsyringe';

import { IListCarsDTO } from '@modules/cars/dtos/IListCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository,
  ) {}
  public async execute({ name, brand, category_id }: IListCarsDTO): Promise<Car[]> {
    const cars = await this.repository.findAllAvailable({ name, brand, category_id });
    return cars;
  }
}

export { ListAvailableCarsUseCase };

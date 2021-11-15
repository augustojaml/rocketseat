import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  public async create({ id, car_id, user_id, expected_return_date, end_date, total }: ICreateRentalDTO): Promise<Rental> {
    const repo = this.repository.create({
      id,
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
    });

    const rental = await this.repository.save(repo);
    return rental;
  }

  public async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const car = await this.repository.findOne({ where: { car_id: car_id, end_date: null } });
    return car;
  }

  public async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const user = await this.repository.findOne({ where: { user_id: user_id, end_date: null } });
    return user;
  }

  public async findById(rental_id: string): Promise<Rental> {
    const rental = await this.repository.findOne(rental_id);
    return rental;
  }

  public async findByUser(user_id: string): Promise<Rental[]> {
    const rental = await this.repository.find({ where: { user_id }, relations: ['car', 'user'] });
    return rental;
  }
}
export { RentalsRepository };

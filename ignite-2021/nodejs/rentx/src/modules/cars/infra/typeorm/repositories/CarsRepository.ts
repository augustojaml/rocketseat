import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListCarsDTO } from '@modules/cars/dtos/IListCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  public async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const repo = this.repository.create({
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    const car = await this.repository.save(repo);
    return car;
  }

  public async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  public async findAllAvailable({ name, brand, category_id }: IListCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.category', 'category')
      .leftJoinAndSelect('c.specifications', 'specifications')
      .leftJoinAndSelect('c.images', 'images')
      .where('available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('name = :name', { name: name });
    }

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand: brand });
    }

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id: category_id });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  public async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }

  public async updateAvailable(car_id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({
        available: available,
      })
      .where('id = :id')
      .setParameters({ id: car_id })
      .execute();
  }
}

export { CarsRepository };

import { IListCarsDTO } from '@modules/cars//dtos/IListCarDTO';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAllAvailable({ name, brand, category_id }: IListCarsDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(car_id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };

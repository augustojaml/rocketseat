import { getRepository, Repository } from 'typeorm';

import { ICarImagesDTO } from '@modules/cars/dtos/ICarImagesDTO';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';

import { CarImages } from '../entities/CarImages';

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImages>;

  constructor() {
    this.repository = getRepository(CarImages);
  }

  public async create({ car_id, image_name }: ICarImagesDTO): Promise<CarImages> {
    const repo = this.repository.create({
      car_id,
      image_name,
    });

    const carImages = await this.repository.save(repo);

    return carImages;
  }
}

export { CarImagesRepository };

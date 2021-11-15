import { ICarImagesDTO } from '../dtos/ICarImagesDTO';
import { CarImages } from '../infra/typeorm/entities/CarImages';

interface ICarImagesRepository {
  create({ car_id, image_name }: ICarImagesDTO): Promise<CarImages>;
}

export { ICarImagesRepository };

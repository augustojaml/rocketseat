import { ICreatePhotoDTO } from '../dtos/ICreatePhotoDTO';

interface IPhotosImplement {
  create({ user_id, photo }: ICreatePhotoDTO): Promise<void>;
}

export { IPhotosImplement };

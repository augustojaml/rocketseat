import { getRepository, Repository } from 'typeorm';

import { ICreatePhotoDTO } from '@modules/users/dtos/ICreatePhotoDTO';
import { IPhotosImplement } from '@modules/users/implements/IPhotosImplement';

import { Photo } from '../entities/Photo';

class PhotosRepository implements IPhotosImplement {
  private repository: Repository<Photo>;

  constructor() {
    this.repository = getRepository(Photo);
  }

  public async create({ user_id, photo }: ICreatePhotoDTO): Promise<void> {
    const repo = this.repository.create({
      user_id,
      photo,
    });
    await this.repository.save(repo);
  }
}

export { PhotosRepository };

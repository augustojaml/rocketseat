import { inject, injectable } from 'tsyringe';

import { IUploadPhotosDTO } from '@modules/users/dtos/IUploadPhotosDTO';
import { IPhotosImplement } from '@modules/users/implements/IPhotosImplement';

@injectable()
class UploadPhotosUseCase {
  constructor(
    @inject('PhotosRepository')
    private photosRepository: IPhotosImplement,
  ) {}

  public async execute({ user_id, photos }: IUploadPhotosDTO): Promise<void> {
    photos.map(async photo => {
      await this.photosRepository.create({ user_id, photo });
    });
  }
}

export { UploadPhotosUseCase };

import { inject, injectable } from 'tsyringe';

import { IUploadCarImagesDTO } from '@modules/cars/dtos/IUploadCarImagesDTO';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ car_id, images_name }: IUploadCarImagesDTO): Promise<void> {
    images_name.map(async image => {
      await this.carImagesRepository.create({ car_id, image_name: image });
      this.storageProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImagesUseCase };

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IImageFilesDTO } from '@modules/cars/dtos/IImageFilesDTO';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

class UploadCarImagesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IImageFilesDTO[];

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const fileName = images.map(file => file.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name: fileName,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };

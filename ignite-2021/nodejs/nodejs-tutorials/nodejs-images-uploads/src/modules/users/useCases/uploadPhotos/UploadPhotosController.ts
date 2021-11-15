import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadPhotosUseCase } from './UploadPhotosUseCase';

interface IPhotoRequest {
  filename: string;
}

class UploadPhotosController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const photos = request.files as IPhotoRequest[];
    const uploadPhotos = container.resolve(UploadPhotosUseCase);
    const filename = photos.map(photo => photo.filename);

    await uploadPhotos.execute({
      user_id: id,
      photos: filename,
    });

    return response.status(201).send();
  }
}

export { UploadPhotosController };

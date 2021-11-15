import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateAvatarValidate } from '@modules/users/validate/UpdateAvatarValidate';

import { UpdateAvatarUseCase } from './UpdateAvatarUseCase';

class UpdateAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const avatar_file = request.file?.filename;

    await UpdateAvatarValidate.handle(avatar_file);

    const updateAvatar = container.resolve(UpdateAvatarUseCase);

    const user = await updateAvatar.execute({ user_id, avatar_file });

    return response.json(user);
  }
}

export { UpdateAvatarController };

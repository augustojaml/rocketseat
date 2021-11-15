import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const updateUser = container.resolve(UpdateUserAvatarUseCase);
    const avatar_file = request.file.filename;
    await updateUser.execute({ user_id, avatar_file });
    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };

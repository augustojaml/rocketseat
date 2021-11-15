import { inject, injectable } from 'tsyringe';

import { IUpdateAvatarDTO } from '@modules/users/dtos/IUpdateAvatarDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { StorageSupport } from '@support/StorageSupport';

@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatar_file }: IUpdateAvatarDTO): Promise<string> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (findUser.avatar) {
      await this.storageProvider.delete(findUser.avatar, 'avatar');
    }

    await this.storageProvider.save(avatar_file, 'avatar');

    findUser.avatar = avatar_file;

    await this.usersRepository.update(findUser);

    return `${StorageSupport.appURL}/avatar/${findUser.avatar}`;
  }
}

export { UpdateAvatarUseCase };

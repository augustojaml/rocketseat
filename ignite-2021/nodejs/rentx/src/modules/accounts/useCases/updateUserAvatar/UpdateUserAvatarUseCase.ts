import { inject, injectable } from 'tsyringe';

import { IUpdateUserDTO } from '@modules/accounts/dtos/IUpdateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatar_file }: IUpdateUserDTO): Promise<void> {
    const findUser = await this.repository.findById(user_id);

    if (findUser.avatar) {
      await this.storageProvider.delete(findUser.avatar, 'avatar');
    }

    await this.storageProvider.save(avatar_file, 'avatar');

    findUser.avatar = avatar_file;

    await this.repository.create(findUser);
  }
}

export { UpdateUserAvatarUseCase };

import { inject, injectable } from 'tsyringe';

import { IProfileDTO } from '@modules/users/dtos/IProfileDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { StorageSupport } from '@support/StorageSupport';

@injectable()
class GetProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<IProfileDTO | null> {
    const findUser = await this.usersRepository.findById(id);

    const profile: IProfileDTO = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      isHairdresser: findUser.isHairdresser,
      avatar: findUser.avatar,
      avatar_url: findUser.avatar && `${StorageSupport.appURL}/avatar/${findUser.avatar}`,
    };

    return profile;
  }
}

export { GetProfileUseCase };

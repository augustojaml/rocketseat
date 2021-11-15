import * as files from '@config/files';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let updateUserAvatarUseCase: UpdateUserAvatarUseCase;

jest.mock('@config/files', () => ({
  deleteFile: jest.fn(() => 'deleteFile'),
}));

describe('Update Avatar', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(usersRepositoryInMemory);
  });

  it('Should be able update avatar', async () => {
    const user1 = await usersRepositoryInMemory.create({
      name: 'name-user-1',
      password: 'password-user-1',
      email: 'email-user-1',
      drive_license: 'drive-license-user-1',
    });

    await updateUserAvatarUseCase.execute({ user_id: user1.id, avatar_file: 'avatar_file' });
    expect(files.deleteFile('avatar_file')).toBe('deleteFile');
  });
});

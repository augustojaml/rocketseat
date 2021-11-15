import { container } from 'tsyringe';

import { IPhotosImplement } from '@modules/users/implements/IPhotosImplement';
import { IUsersImplement } from '@modules/users/implements/IUsersImplement';
import { PhotosRepository } from '@modules/users/infra/typeorm/repositories/PhotosRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersImplement>('UsersRepository', UsersRepository);

container.registerSingleton<IPhotosImplement>('PhotosRepository', PhotosRepository);

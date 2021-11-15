# Project NodeJS, Express, Typescript, Database and Upload multiple images

### 😏 Follow the link [Start project](https://www.notion.so/Fast-Nodejs-express-eslint-and-prettier-24b36cf5acfc4869aafba0e31cb12b62)

### 😏  Delete file `src/server.ts`

### 😏  install dependencies
```bash
yarn add bcrypt express-async-errors jsonwebtoken reflect-metadata sqlite3 tsyringe typeorm uuid
```

### 😏 install devDependencies
```bash
yarn add -D @types/bcrypt @types/jsonwebtoken @types/uuid tsconfig-paths
```

### Update tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "rootDir": "./",
    "baseUrl": "./src",
    "paths": {
      "@modules/*": ["modules/*"],
      "@shared/*": ["shared/*"],
    },
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}
```

### 😏 Update `package.json`
```json
"scripts": {
  "build": "tsc",
  "dev:server": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/infra/http/server.ts",
  "dev": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/infra/http/server.ts",
  "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js"
},
```

### 😏 Create file `src/shared/errors/AppError.ts`
```ts
import { NextFunction, Request, Response } from 'express';

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }

  public static middleware = (
    err: Error,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: NextFunction,
  ): Response => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    // eslint-disable-next-line no-console
    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  };
}
export { AppError };
```
### 😏 Create file `ormconfig.json` in root project
```json
{
  "type": "sqlite",
  "database": "./src/shared/infra/database/database.sqlite",
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "entities": ["./src/modules/**/entities/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
```


### 😏 Create file `src/shared/infra/database/createConnections.ts`
```ts
import { Connection, createConnection as connection, getConnectionOptions } from 'typeorm';

const createConnection = async (host = 'localhost'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return connection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database: process.env.NODE_ENV === 'test' ? 'db_test' : defaultOptions.database,
    }),
  );
};

export { createConnection };
```


### 😏 Create file `src/shared/infra/http/routes/index.ts`
```ts
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (request: Request, response: Response): void => {
  response.json({ message: 'Hello Typescript com Nodejs, Express, Eslint e Prettier' });
});

export { router };
```
### 😏 Create file `src/shared/infra/http/app.ts`
```ts
import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import { createConnection } from '../database/createConnections';

createConnection();

const app = express();

app.use(express.json());
app.use(router);
app.use(AppError.middleware);

export { app };
```
### 😏 Create file `src/shared/infra/http/server.ts`
```ts
import { app } from '@shared/infra/http/app';

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});
```

### 😏 Test the application
```bash
yarn dev
```

### 😏 Open browser and access the url `http://localhost:3333` check the message
```json
{
  "message": "Structure Project NodeJS, Express, Typescript and Database"
}
```

### 😏 Create migration CreateUsers
```bash
yarn typeorm migration:create -n CreateUsers
```

### 😏 Copy only methods `public async up` and `public async down`
```ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1633051174682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
```


### 😏 Create migration CreatePhotos
```bash
yarn typeorm migration:create -n CreatePhotos
```

### 😏 Copy only methods `public async up` and `public async down`
```ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePhotos1633051477084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'photos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'photo',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_user_photos',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('photos', 'fk_user_photos');
    await queryRunner.dropTable('users');
  }
}
```

### 😏 Execute migrations
```bash
yarn typeorm migration:run
```

### 😏 Create Entity File `src/modules/users/infra/typeorm/entities/Photo.ts`
```ts
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('photos')
class Photo {
  @PrimaryColumn()
  id: string;

  @Column()
  photo: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
export { Photo };
```
### 😏 Create Entity File `src/modules/users/infra/typeorm/entities/User.ts`

```ts
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Photo } from './Photo';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Photo, photos => photos.user)
  photo: Photo[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
```

### 😏 Create DTO `src/modules/users/dtos/ICreateUserDTO.ts`
```ts
interface ICreateUsersDTO {
  id?: string;
  name: string;
  email: string;
  photos?: string;
}
export { ICreateUsersDTO };
```
### 😏 Create Interface `src/modules/users/implements/IUsersImplement.ts`
```ts
import { ICreateUsersDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

interface IUsersImplement {
  create({ id, name, email, photos }: ICreateUsersDTO): Promise<User>;
  list(): Promise<User[]>;
}

export { IUsersImplement };
```

### 😏 Crate Repository `src/modules/users/infra/typeorm/repositories/UsersRepository.ts`
```ts
import { getRepository, Repository } from 'typeorm';

import { ICreateUsersDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersImplement } from '@modules/users/implements/IUsersImplement';

import { User } from '../entities/User';

class UsersRepository implements IUsersImplement {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ id, name, email, photos }: ICreateUsersDTO): Promise<User> {
    const repo = this.repository.create({ id, name, email, photos });

    const user = await this.repository.save(repo);

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  public async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}

export { UsersRepository };
```

### 😏 Create useCase `src/modules/users/useCases/CreateUser/CreateUserUseCase.ts`
```ts
import { inject, injectable } from 'tsyringe';

import { ICreateUsersDTO } from '@modules/users//dtos/ICreateUserDTO';
import { IUsersImplement } from '@modules/users//implements/IUsersImplement';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersImplement,
  ) {}

  public async execute({ name, email }: ICreateUsersDTO): Promise<User> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (findUser) {
      throw new AppError('User already exists');
    }

    const user = await this.usersRepository.create({ name, email });

    return user;
  }
}
export { CreateUserUseCase };
```

### 😏 Create Controller `src/modules/users/useCases/createUser/CreateUserController.ts`
```ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({ name, email });
    return response.status(201).json(user);
  }
}
export { CreateUserController };
```

### 😏 Create Container `src/shared/container/index.ts`
```ts
import { container } from 'tsyringe';

import { IUsersImplement } from '@modules/users/implements/IUsersImplement';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersImplement>('UsersRepository', UsersRepository);
```
### Update `src/shared/infra/http/app.ts` import `container`
```ts
import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import { AppError } from '@shared/errors/AppError';
import { createConnection } from '@shared/infra/database/createConnections';
import { router } from '@shared/infra/http/routes';

import '@shared/container';

createConnection();

const app = express();

app.use(express.json());
app.use(router);
app.use(AppError.middleware);

export { app };
```

### 😏 Create Route `src/shared/infra/http/routes/users.routes.ts`
```ts
import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';

const usersRoutes = Router();
const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
```

### 😏 Update Route `src/shared/infra/http/routes/index.ts`
```ts
import { Router } from 'express';

import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);

export { router };
```

### 😏 Create useCase `src/modules/users/useCases/listUsers/ListUsersUseCase.ts`
```ts
import { inject, injectable } from 'tsyringe';

import { IUsersImplement } from '@modules/users/implements/IUsersImplement';
import { User } from '@modules/users/infra/typeorm/entities/User';

@injectable()
class ListUsersCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersImplement,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();
    return users;
  }
}

export { ListUsersCase };
```
### 😏 src/modules/users/useCases/listUsers/ListUsersController.ts
```ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersCase } from './ListUsersUseCase';

class ListUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersCase);
    const users = await listUsers.execute();
    return response.json(users);
  }
}

export { ListUsersController };
```

### 😏 Update tsconfig.json add path `"@config/*": ["config/*"]`
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "rootDir": "./",
    "baseUrl": "./src",
    "paths": {
      "@config/*": ["config/*"],
      "@modules/*": ["modules/*"],
      "@shared/*": ["shared/*"],
    },
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}
```

### 😏 Install dependencies
```bash
yarn add multer
```

### 😏 Install devDependencies
```bash
yarn add @types/multer
```
### 😏 Create file `src/config/files.ts`
```ts
import crypto from 'crypto';
import fs from 'fs';
import multer from 'multer';
import { resolve } from 'path';

const uploadFile = (folder: string): unknown => {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', folder),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      },
    }),
  };
};

const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch {
    // eslint-disable-next-line no-useless-return
    return;
  }
  await fs.promises.unlink(filename);
};

export { uploadFile, deleteFile };
```

### 😏 Create file `src/modules/users/dtos/IUploadPhotosDTO.ts`
```ts
interface IUploadPhotosDTO {
  car_id: string;
  images_name: string[];
}

export { IUploadPhotosDTO };
```
### 😏 Create file `src/modules/users/useCases/uploadPhotos/UploadPhotosUseCase.ts`
```ts
import { inject, injectable } from 'tsyringe';

import { IUploadPhotosDTO } from '@modules/users/dtos/IUploadPhotosDTO';
import { IPhotosImplement } from '@modules/users/implements/IPhotosImplement';

@injectable()
class UploadPhotosUseCase {
  constructor(
    @inject('PhotosRepository')
    private photosRepository: IPhotosImplement,
  ) {}

  public async execute({ user_id, photos }: IUploadPhotosDTO): Promise<void> {
    photos.map(async photo => {
      await this.photosRepository.create({ user_id, photo });
    });
  }
}

export { UploadPhotosUseCase };
```

### 😏 Create Controller `src/modules/users/useCases/uploadPhotos/UploadPhotosController.ts`
```ts
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
```
### 😏 Update Container `src/shared/container/index.ts`
```ts
import { container } from 'tsyringe';

import { IPhotosImplement } from '@modules/users/implements/IPhotosImplement';
import { IUsersImplement } from '@modules/users/implements/IUsersImplement';
import { PhotosRepository } from '@modules/users/infra/typeorm/repositories/PhotosRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersImplement>('UsersRepository', UsersRepository);

container.registerSingleton<IPhotosImplement>('PhotosRepository', PhotosRepository);
```

### 😏 Update `src/shared/infra/http/routes/users.routes.ts`
```ts
import { Router } from 'express';
import multer from 'multer';

import { uploadFile } from '@config/files';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { UploadPhotosController } from '@modules/users/useCases/uploadPhotos/UploadPhotosController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const uploadPhotosController = new UploadPhotosController();

const upload = multer(uploadFile('storage/photos'));

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUsersController.handle);
usersRoutes.post('/images/:id', upload.array('photos'), uploadPhotosController.handle);

export { usersRoutes };
```


### 😏 if it's not running, start the application
```bas
yarn dev
```

### 😏 Update method list in `src/modules/users/infra/typeorm/repositories/UsersRepository.ts` if want show images in list users
```ts
public async list(): Promise<User[]> {
  const users = await this.repository.find({ relations: ['photos'] });
  return users;
}
```
### 😏 Test the routes

- Create User => {{ _.baseURL }}/users | {name, email}
- List Users => {{ _.baseURL }}/users
- Upload => {{ _.baseURL }}/users/images/{id of user} | {photos}



# NodeJS with authenticate database SQLite and upload of avatar

### 😏 Follow the tutorial 👉 [NodeJS, Express and Typescript](https://www.notion.so/Fast-Nodejs-express-eslint-and-prettier-24b36cf5acfc4869aafba0e31cb12b62)


### 😏 Install dependencies

```bash
yarn add reflect-metadata sqlite3 typeorm bcrypt jsonwebtoken uuid express-async-errors multer
```

```bash
yarn add @types/bcrypt @types/jsonwebtoken @types/uuid @types/multer -D
```

### 😏 Comment and Uncomment in `tsconfig.json` if you have not performed this procedure
```json
  comment
  // "strict": true,

  // uncomment
  "outDir": "./dist"
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
```

### 😏 Update file `package.json` adding `typeorm` in `scripts`
```json
"scripts": {
  "build": "tsc",
  "dev:server": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
  "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js"
}
```

### 😏 Create file `ormconfig.json` in `root project folder`
```json
{
  "type": "sqlite",
  "database": "./src/database/database.sqlite",
  "migrations": ["./src/database/migrations/*.ts"],
  "entities": ["./src/database/entities/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
```

### 😏 Create file `src/database/index.ts`
```typescript
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'localhost'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database: process.env.NODE_ENV === 'test' ? 'db_test' : defaultOptions.database,
    }),
  );
};
```

### Create migration Create User
```bash
yarn typeorm migration:create -n CreateUsers
```

### 😏 Update file created in `src/database/migrations`. Copy bellow only the method `public async up` and `public async down`
```typescript
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1632729991671 implements MigrationInterface {
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
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
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

### 😏 Execute migration Create User
```bash
yarn typeorm migration:run
```

### 😏 Create file `src/database/entities/User.ts`
```typescript
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('boolean', { default: false })
  is_admin: boolean;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
export { User };
```

### 😏 Create DTO `src/dtos/ICreateUserDTO.ts`
```typescript
interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}
export { ICreateUserDTO };
```

### 😏 Create Repository `src/repositories/UsersRepository.ts`
```typescript
import { getRepository, Repository, Not } from 'typeorm';

import { User } from '../database/entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';

class UsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const repo = this.repository.create({
      name,
      email,
      password,
    });

    const user = await this.repository.save(repo);
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const findUser = await this.repository.findOne({ email });
    return findUser;
  }

  public async all(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  public async findById(id: string): Promise<User> {
    const findUser = await this.repository.findOne(id);
    return findUser;
  }

  public async update({ id, name, email, password, avatar }: IUpdateUserDTO): Promise<User> {
    const repo = this.repository.create({
      id,
      name,
      email,
      password,
      avatar,
    });
    const user = await this.repository.save(repo);
    return user;
  }
}
export { UsersRepository };
```

### 😏 Create file `src/errors/AppError.ts`
```typescript
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
### 😏 Create file `src/@types/express/index.ts`
```typescript
/* eslint-disable */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
```
### 😏 Create file `src/utils/security.ts`
```typescript
const security = {
  hash: '2e247e2eb505c42b362e80ed4d05b078',
  expireIn: '1d',
};

export { security };
```


### 😏 Create file `src/middleware/ensureIsAuthenticated.ts`
```typescript
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';
import { security } from '../utils/security';

const ensureIsAuthenticated = async (request: Request, _: Response, next: NextFunction): Promise<void> => {
  const requestHeader = request.headers.authorization;
  if (!requestHeader) {
    throw new AppError('Invalid token');
  }

  const [, token] = requestHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, security.hash) as { sub: string };
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('No-existent user');
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token');
  }
};
export { ensureIsAuthenticated };
```
###  😏 Create file `src/utils/files.ts`
```typescript
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

### 😏 Create file `src/routes/users.routes.ts`
```typescript
import { compare, hash } from 'bcrypt';
import { Request, Response, Router } from 'express';
import { sign } from 'jsonwebtoken';
import multer from 'multer';

import { AppError } from '../errors/AppError';
import { ensureIsAuthenticated } from '../middleware/ensureIsAuthenticated';
import { UsersRepository } from '../repositories/UsersRepository';
import { deleteFile, uploadFile } from '../utils/files';
import { security } from '../utils/security';

const usersRoutes = Router();

usersRoutes.post('/', async (request: Request, response: Response): Promise<Response> => {
  const { name, email, password } = request.body;
  const usersRepository = new UsersRepository();
  const findUser = await usersRepository.findByEmail(email);
  if (findUser) {
    throw new AppError('User already exists');
  }

  const hashPassword = await hash(password, 8);

  const user = await usersRepository.create({ name, email, password: hashPassword });
  return response.json({ user });
});

usersRoutes.post('/authenticate', async (request: Request, response: Response): Promise<Response> => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();

  // CHECK IF USER EXISTS
  const findUser = await usersRepository.findByEmail(email);
  if (!findUser) {
    throw new AppError('Email or password incorrect');
  }

  // COMPARE (TEXT, ENCRYPTED)
  const comparePassword = await compare(password, findUser.password);
  if (!comparePassword) {
    throw new AppError('Email or password incorrect');
  }

  const token = sign({}, security.hash, {
    subject: findUser.id,
    expiresIn: security.expireIn,
  });

  const responseReturn = {
    user: {
      name: findUser.name,
      email: findUser.email,
    },
    token: token,
  };

  return response.json(responseReturn);
});

usersRoutes.get('/', ensureIsAuthenticated, async (request: Request, response: Response): Promise<Response> => {
  const usersRepository = new UsersRepository();
  const users = await usersRepository.all();
  return response.json({ users });
});

/**
 * UPLOAD
 */
const storage = 'temp/avatar';
const upload = multer(uploadFile(storage));

usersRoutes.patch(
  '/avatar',
  ensureIsAuthenticated,
  upload.single('avatar'),
  async (request: Request, response: Response): Promise<Response> => {
    const { id: user_id } = request.user;
    const avatar_file = request.file.filename;
    const usersRepository = new UsersRepository();
    const findUser = await usersRepository.findById(user_id);
    if (findUser) {
      await deleteFile(`${storage}/${findUser.avatar}`);
    }

    findUser.avatar = avatar_file;
    await usersRepository.update(findUser);

    return response.send();
  },
);
export { usersRoutes };
```

### 😏 Create file `src/routes/index.routes.ts`
```typescript
import { Request, Response, Router } from 'express';

import { usersRoutes } from './users.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.json({ message: 'NodeJS, typescript Authenticate User' });
});

routes.use('/users', usersRoutes);

export { routes };
```
### 😏 Create file `src/app.ts`
```typescript
import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';

import createConnection from './database/createConnections';
import { AppError } from './errors/AppError';
import { routes } from './routes/index.routes';

createConnection();

const app = express();

app.use(express.json());

app.use(routes);
app.use(AppError.middleware);

export { app };
```

### 😏 Create file `src/server.ts`
```typescript
import { app } from './app';

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});
```

### 😏 Test the Endpoints

- GET - {{ _.BASEURL }}
- POST - {{ _.BASEURL }}/users
  ```json
  {
    "name":"Joe Doe",
    "email":"joedoe@email.com",
    "password":"123456"
  }
  ```
- POST - {{ _.BASEURL }}/users/authenticate
  ```json
  {
    "email":"joedoe@email.com",
    "password":"123456"
  }
  ```
- GET - {{ _.BASEURL }}/users
  - Need of authentication

- PATCH {{ _.BASEURL }}/users/avatar
  - Need to be authenticated
  - Structured - Multipart From
  - name: avatar, type file

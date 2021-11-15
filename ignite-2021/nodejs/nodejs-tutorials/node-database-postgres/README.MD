# NodeJS with Database PostgreSQL

### Fallow the link [Init and Config NodeJS](https://www.notion.so/Fast-Nodejs-express-eslint-and-prettier-24b36cf5acfc4869aafba0e31cb12b62)

### Install Dependencies

```bash
yarn add uuid typeorm tsyringe reflect-metadata pg express-async-errors
```

### Create file `src/shared/containers/index.ts`

```typescript
// init container and register singleton
```

### Create file `src/routes/index.routes.ts`
```typescript
import { Router } from 'express';

const routes = Router();

export { routes };
```

### Create file `ormconfig.json` in root project
```json
{
  "type":"postgres",
  "port":"5432",
  "host":"localhost",
  "username":"postgres",
  "password":"postgres",
  "database":"temp_users",
  "entities": [
    "./src/**/entities/*.ts"
  ],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir":"./src/database/migrations"
  }
}
```
#### attention: create the database `temp_users` in postgres, set config in `ormconfig.json` `username`, `password` and database.


### Create file `src/database/index.ts`
```typescript
import { createConnections } from 'typeorm';

createConnections();
```

### Create file `src/errors/AppError.ts`
```typescript
import { NextFunction, Request, Response } from 'express';

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

const appErrorMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction,
): Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
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
export { AppError, appErrorMiddleware };
```

### update package.json bellow MIT, dd typeorm commands
```json
"scripts": {
  "build": "tsc",
  "dev:server": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
  "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js"
},
```

### Update the `src/server.ts`
```typescript
import express from 'express';
import 'express-async-errors';

import './database';
import './shared/containers';

import { appErrorMiddleware } from './error/AppError';
import { routes } from './routes/index.routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(appErrorMiddleware);

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});
```
### In terminal start project
```typescript
yarn dev
```
#### check output your terminal if have errors

### Create migration User in `src/database/migrations`

```bash
yarn typeorm migration:create -n CreateUsers
```
### Update migration
```typescript
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1632573941687 implements MigrationInterface {
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
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
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
```bash
yarn typeorm migration:run
```

#### Attention, copy only the methods `public async up` and `public async down`. Don't copy all class

### Create Entities User in `src/modules/users/entities/User.ts`

```typescript
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
```
### Create Interface Repository `src/modules/users/repositories/IUsersRepository.ts`
```typescript
import { User } from '../entities/User';

interface ICreateUser {
  name: string;
  email: string;
}

interface IUsersRepository {
  create({ name, email }: ICreateUser): Promise<User>;
  find(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(user: User): Promise<User>;
  destroy(id: string): Promise<void>;
}

export { IUsersRepository, ICreateUser };
```
### Create Implementation Repository `src/modules/users/repositories/implementations/UsersRepository.ts`
```typescript
import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { ICreateUser, IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ name, email }: ICreateUser): Promise<User> {
    const user = this.repository.create({
      name: name,
      email: email,
    });
    await this.repository.save(user);

    return user;
  }

  public async find(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email: email });
    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  public async update(user: User): Promise<User> {
    const updateUser = await this.repository.save(user);
    return updateUser;
  }

  public async destroy(id: string): Promise<void> {
    const user = await this.findById(id);

    await this.repository.remove(user);
  }
}

export { UsersRepository };
```
### Register repository in 'src/shared/containers/index.ts'
```typescript
import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
```

### Create UseCase `src/modules/users/useCases/createUser/CreateUserUseCase.ts`

```typescript
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface ICreateUserUseCase {
  name: string;
  email: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  public async execute({ name, email }: ICreateUserUseCase): Promise<User> {
    const findUser = await this.repository.findByEmail(email);
    if (findUser) {
      throw new AppError('User already exists');
    }

    const user = await this.repository.create({
      name: name,
      email: email,
    });

    return user;
  }
}
export { CreateUserUseCase }
```
### Create User Controller `src/modules/users/useCases/createUser/CreateUserController.ts`
```typescript
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({ name: name, email: email });
    return response.json(user);
  }
}
export { CreateUserController };
```

### Create file `src/routes/users.routes.ts`
```typescript
import { Router } from 'express';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
```

### Update `src/routes/index.routes.ts`
```typescript
import { Router } from 'express';

import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);

export { routes };
```

### TestRoutes

POST {{ _.baseURL }}/users
```json
{
	"name":"Augusto Monteiro",
	"email":"augusto@email.com"
}
```

### Obs: In project [node-database-postgres](https://github.com/augustojaml/nodejs-typescript-tutorials/tree/master/node-database-postgres) contain the other `usesCases`
- listUsers
- deleteUser
- showUser
- updateUser



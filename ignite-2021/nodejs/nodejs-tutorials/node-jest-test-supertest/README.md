# NodeJS, typescript, test and super test

### 🤜 Follow the link [NodeJS Init](https://www.notion.so/Fast-Nodejs-express-eslint-and-prettier-24b36cf5acfc4869aafba0e31cb12b62)

### 🤜 Install the dependencies
```bash
yarn add reflect-metadata sqlite3 express-async-errors supertest tsyringe typeorm uuid
```

### 🤜 Install the devDependencies
```bash
yarn add jest ts-jest @types/jest @types/supertest @types/uuid tsconfig-paths -D
```
### 🤜 Update package.json
```json
"scripts": {
    "build": "tsc",
    "dev": "ts-node-dev --inspect -r tsconfig-paths/register --transpile-only --ignore-watch node_modules src/shared/infra/http/server.ts",
    "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
    "test": "NODE_ENV=test jest --runInBand --detectOpenHandles"
  },
```
### 🤜 Create file `ormconfig.json`
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
### Create Connection `src/shared/infra/database/index.ts`
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


### 🤜 Update `tsconfig.json`
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
      "@config/*": ["config/*"],
      "@support/*": ["support/*"]
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

### 🤜 Create migration CreateUsers
```bash
yarn typeorm migration:create -n CreateUsers
```

### 🤜 Update migration created in `src/shared/infra/typeorm/migrations/????????????-CreateUsers.ts`. Update only method up and down
```ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1634002087099 implements MigrationInterface {
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

### 🤜 Run created migration
```bash
yarn typeorm migration:run
```



### 🤜 Create Error `src/shared/errors/AppError.ts`
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

### 🤜 Create DTO `src/modules/users/dtos/ICreateUserDTO.ts`
```ts
interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
}
export { ICreateUserDTO };
```

### 🤜 Create Repository (Interface) `src/modules/users/repositories/IUsersRepository.ts`
```ts
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  create({ id, name, email }: ICreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
}

export { IUsersRepository };
```

### 🤜 Create Fake `src/modules/users/repositories/fakes/FakeUsersRepository.ts`
```ts
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private repository: User[] = [];

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.find(user => user.email === email);
    return user;
  }
  public async create({ name, email }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
    });

    await this.repository.push(user);
    return user;
  }
  public async findAll(): Promise<User[]> {
    const users = await this.repository;
    return users;
  }
}

export { FakeUsersRepository };
```

### 🤜 Create Repository `src/modules/users/infra/typeorm/repositories/UsersRepository.ts`
```ts
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ id, name, email }: ICreateUserDTO): Promise<User> {
    const repo = this.repository.create({
      id,
      name,
      email,
    });
    const user = await this.repository.save(repo);
    return user;
  }

  findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email });
    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}

export { UsersRepository };
```

### 🤜 Create UseCase `src/modules/users/useCases/createUser/CreateUserUseCase.ts`
```ts
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email }: ICreateUserDTO): Promise<User> {
    const findUser = await this.usersRepository.findByEmail(email);
    if (findUser) {
      throw new AppError('User already exists');
    }

    const user = await this.usersRepository.create({
      name,
      email,
    });

    return user;
  }
}
export { CreateUserUseCase };
```

### 🤜 Create Controller `src/modules/users/useCases/createUser/CreateUserController.ts`
```ts
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({ name, email });
    return response.json(user);
  }
}
export { CreateUserController };
```

### 🤜 Create UseCase `src/modules/users/useCases/listUsers/ListUsersUseCase.ts`
```ts
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAll();
    return users;
  }
}
export { ListUsersUseCase };
```

### 🤜 Create Controller `src/modules/users/useCases/listUsers/ListUsersController.ts`
```ts
import { ListUsersUseCase } from '@modules/users/useCases/listUsers/ListUsersUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUsersUseCase);
    const users = await listUser.execute();
    return response.json(users);
  }
}

export { ListUsersController };
```

### 🤜 Create Container Repositories `src/shared/container/repositories/index.ts`
```ts
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
```

### 🤜 Create Import All Container `src/shared/container/index.ts`
```ts
import '@shared/container/repositories';
```

### 🤜 Create UsersRoutes `src/shared/infra/http/routes/users.routes.ts`
```ts
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { Router } from 'express';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUserController.handle);

export { usersRoutes };
```


### 🤜 Create App `src/shared/infra/http/app.ts`
```ts
import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import '@shared/container';
import { createConnection } from '../database';

createConnection();

const app = express();

app.use(express.json());
app.use(router);
app.use(AppError.middleware);

export { app };
```


### 🤜 src/shared/infra/http/server.ts
```ts
import { app } from '@shared/infra/http/app';

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});
```

### 🤜 src/shared/infra/http/server.ts
```ts
import { app } from '@shared/infra/http/app';

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});
```

### 🤜 Test the routes
- POST {{ _.baseURL }}/users
  ```json
  {
    "name":"Carolina Acosta",
    "email":"carolina93@domain.tld"
  }
  ```
- GET {{ _.baseURL }}/users


## Testing Test Unit

### 🤜 Init Jest
```bash
yarn jest --init
```

### 🤜 Config

- Would you like to use Jest when running "test" script in "package.json"? `yes`
- Would you like to use Typescript for the configuration file? `yes`
- Would you like to use Typescript for the configuration file? `node`
- Do you want Jest to add coverage reports? `no`
- Which provider should be used to instrument code for coverage? `v8`
- Automatically clear mock calls and instances between every test? `yes`

### Update jest.config.ts
```ts
// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: 0,
  clearMocks: true,
  collectCoverage: true,
  // If want test in controllers
  // collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*UseCase.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
};
```


### 🤜 Create UseCase Test `src/modules/users/useCases/createUser/CreateUserUseCase.spec.ts`
```ts
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
  });

  it('Should not be be able to create a new user with email existent', async () => {
    await createUserUseCase.execute({
      name: 'user-1',
      email: 'user-1@test',
    });

    await expect(
      createUserUseCase.execute({
        name: 'user-2',
        email: 'user-1@test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be be able to create a new user', async () => {
    const user1 = await createUserUseCase.execute({
      name: 'user-1',
      email: 'user-1@test',
    });

    expect(user1).toEqual(expect.objectContaining({ name: 'user-1', email: 'user-1@test' }));
  });
});
```

### 🤜 Create UseCase Test `src/modules/users/useCases/listUsers/ListUsersUseCase.spec.ts`
```ts
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { ListUsersUseCase } from '@modules/users/useCases/listUsers/ListUsersUseCase';

let fakeUsersRepository: FakeUsersRepository;
let listUsersUseCase: ListUsersUseCase;

describe('List Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsersUseCase = new ListUsersUseCase(fakeUsersRepository);
  });

  it('Should be able to list all users', async () => {
    await fakeUsersRepository.create({
      name: 'user-1',
      email: 'user-1@test',
    });
    await fakeUsersRepository.create({
      name: 'user-2',
      email: 'user-2@test',
    });
    await fakeUsersRepository.create({
      name: 'user-3',
      email: 'user-3@test',
    });

    const users = await listUsersUseCase.execute();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'user-1', email: 'user-1@test' }),
        expect.objectContaining({ name: 'user-2', email: 'user-2@test' }),
        expect.objectContaining({ name: 'user-3', email: 'user-3@test' }),
      ]),
    );
  });
});
```

## Testing Test Integration

### 🤜 Create Controller Test `src/modules/users/useCases/createUser/CreateUserController.spec.ts`
```ts
import request from 'supertest';
import { Connection } from 'typeorm';

import { createConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new User', async () => {
    const { body: data } = await request(app).post('/users').send({
      name: 'user-1',
      email: 'user-1@test',
    });

    expect(data).toEqual(expect.objectContaining({ name: 'user-1', email: 'user-1@test' }));
  });
});
```

### 🤜 Create Controller `src/modules/users/useCases/listUsers/ListUsersController.spec.ts`
```ts
import request from 'supertest';
import { Connection } from 'typeorm';

import { createConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('List User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to list all users', async () => {
    await request(app).post('/users').send({
      name: 'user-1',
      email: 'user-1@test',
    });
    await request(app).post('/users').send({
      name: 'user-2',
      email: 'user-2@test',
    });
    await request(app).post('/users').send({
      name: 'user-3',
      email: 'user-3@test',
    });

    const { body: data } = await request(app).get('/users');

    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'user-1', email: 'user-1@test' }),
        expect.objectContaining({ name: 'user-2', email: 'user-2@test' }),
        expect.objectContaining({ name: 'user-3', email: 'user-3@test' }),
      ]),
    );
  });
});
```

### 🤜 Run test
```bash
yarn test
```

### Check if message bellow is equal
```bash
 PASS  src/modules/users/useCases/listUsers/ListUsersUseCase.spec.ts (10.566 s)
 PASS  src/modules/users/useCases/createUser/CreateUserUseCase.spec.ts
 PASS  src/modules/users/useCases/createUser/CreateUserController.spec.ts (11.446 s)
 PASS  src/modules/users/useCases/listUsers/ListUsersController.spec.ts (11.888 s)

=============================== Coverage summary ===============================
Statements   : 100% ( 46/46 )
Branches     : 100% ( 10/10 )
Functions    : 100% ( 4/4 )
Lines        : 100% ( 46/46 )
================================================================================

Test Suites: 4 passed, 4 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        12.555 s
Ran all test suites.
Done in 15.35s.
```




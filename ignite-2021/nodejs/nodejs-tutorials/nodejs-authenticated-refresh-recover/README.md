### Nodejs, typescript, express, auth token, refresh token e recover

### 💻 Flow de tutorial [NodeJS, Express, Eslint, Prettier](https://www.notion.so/Fast-Nodejs-express-eslint-and-prettier-24b36cf5acfc4869aafba0e31cb12b62)

### 💻 Install dependencies
```bash
yarn add bcrypt dayjs express express-async-errors jsonwebtoken reflect-metadata tsyringe typeorm  sqlite3 uuid handlebars nodemailer
```

### 💻 Install devDependencies
```bash
yarn add -D @types/bcrypt @types/jsonwebtoken @types/uuid tsconfig-paths @types/nodemailer
```

### 💻 Delete file `src/server.ts`


### 💻 Update tsconfig.json
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
      "@support/*": ["support/*"],
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
### Create file `ormconfig.json` in root project folder
```ts
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


### 💻 Create Connection `src/shared/infra/database/index.ts`
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

### 💻 Update `package.json`
```ts
"scripts": {
    "build": "tsc",
    "dev": "ts-node-dev --inspect -r tsconfig-paths/register --transpile-only --ignore-watch node_modules src/shared/infra/http/server.ts",
    "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js"
  },
```

### 💻 Create file `src/shared/errors/AppError.ts`
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

### 💻 Create migration `CreateUsers`
```bash
yarn typeorm migration:create -n CreateUsers
```

### 💻 Update methods up and down in migration `src/database/migrations/?????????????-CreateUsers.ts`
```ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers????????????? implements MigrationInterface {
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
            name: 'password',
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
### 💻 Run Migrations
```bash
yarn typeorm migration:run
```

### 💻 Create Entities `src/modules/users/infra/typeorm/entities/User.ts`
```ts
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
### 💻 Create DTO `src/modules/users/dtos/ICreateUserDTO.ts`
```ts
interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
}
export { ICreateUserDTO };
```
### 💻 Create Repository (Interface) `src/modules/users/repositories/IUsersRepository.ts`
```ts
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  create({ id, name, email, password }: ICreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
}

export { IUsersRepository };
```

### 💻 Create Repository (Implementation) `src/modules/users/infra/typeorm/repositories/UsersRepository.ts`
```ts
import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ id, name, email, password }: ICreateUserDTO): Promise<User> {
    const repo = this.repository.create({
      id,
      name,
      email,
      password,
    });
    const user = await this.repository.save(repo);
    return user;
  }

  findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email });
    return user;
  }

  public async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  findById(id: string): Promise<User> {
    const user = this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };
```
### 💻 Create Support src/supports/HashPassword.ts
```ts
import { compare, hash } from 'bcrypt';

class HashPassword {
  public static async hash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public static async compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { HashPassword };
```
### 💻 Create Create User UseCase `src/modules/users/useCases/createUser/CreateUserUseCase.ts`
```ts
import { HashPassword } from 'supports/HashPassword';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const findUser = await this.usersRepository.findByEmail(email);
    if (findUser) {
      throw new AppError('User already exists');
    }

    const hashPassword = await HashPassword.hash(password);

    const user = await this.usersRepository.create({
      name,
      password: hashPassword,
      email,
    });

    return user;
  }
}

export { CreateUserUseCase };
```

### 💻 Create Create User Controller `src/modules/users/useCases/createUser/CreateUserController.ts`
```ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({ name, email, password });
    return response.json(user);
  }
}
export { CreateUserController };
```

### 💻 Create ListUser UseCase `src/modules/users/useCases/listUsers/ListUsersUseCase.ts`
```ts
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();
    return users;
  }
}
export { ListUsersUseCase };
```

### 💻 Create ListUser Controller `src/modules/users/useCases/listUsers/ListUsersController.ts`
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
### 💻 Create UsersRoutes `src/shared/infra/http/routes/users.routes.ts`
```ts
import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUserController.handle);

export { usersRoutes };
```

### 💻 Create IndexRoutes `src/shared/infra/http/routes/index.ts`
```ts
import { Router } from 'express';

import { usersRoutes } from '@shared/infra/http/routes/users.routes';

const router = Router();

router.use('/users', usersRoutes);

export { router };
```

### 💻 Create file RegisterSingletons `src/shared/container/repositories/index.ts`
```ts
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
```

### 💻 Create imports Container `src/shared/container/index.ts`
```ts
import '@shared/container/repositories';
```

### 💻 Create file `src/shared/infra/http/app.ts`

```ts
import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import { AppError } from '@shared/errors/AppError';
import { createConnection } from '@shared/infra/database';
import { router } from '@shared/infra/http/routes';
import '@shared/container';

createConnection();

const app = express();

app.use(express.json());
app.use(router);
app.use(AppError.middleware);

export { app };
```

### Create file `src/shared/infra/http/server.ts`

```ts
import { app } from '@shared/infra/http/app';

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});
```

### 💻 Test Endpoints

- POST {{ _.baseURL }}/users
  ```json
  {
    "name":"Carolina Acosta",
    "email":"carolina93@domain.tld",
    "password":"123456"
  }
  ```

- GET  {{ _.baseURL }}/users

### 💻 Create Migration `CreateUsersTokens`
```bash
yarn typeorm migration:create -n CreateUsersTokens
```

### 💻 Update Migration `src/shared/infra/typeorm/migrations/?????????????-CreateUsersTokens.ts`
```ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTokens????????????? implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'refresh_token',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'expiration_date',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_users_tokens',
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
    await queryRunner.dropTable('users_tokens');
  }
}
```
### 💻 Run Migrations
```bash
yarn typeorm migration:run
```



### 💻 Create Entity `src/modules/users/infra/typeorm/entities/UsersTokens.ts`
```ts
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from './User';

@Entity('users_tokens')
class UsersTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  expiration_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UsersTokens };
```
### 💻 Create DTO `src/modules/users/dtos/ICreateUsersTokensDTO.ts`
```ts
interface ICreateUsersTokensDTO {
  refresh_token: string;
  user_id: string;
  expires_date: Date;
}
export { ICreateUsersTokensDTO };
```
### 💻 Create Repository (Interface) `src/modules/users/repositories/IUsersTokensRepository.ts`
```ts
import { UsersTokens } from '@modules/users/infra/typeorm/entities/UsersTokens';

import { ICreateUsersTokensDTO } from '../dtos/ICreateUsersTokensDTO';

interface IUsersTokensRepository {
  import { UsersTokens } from '@modules/users/infra/typeorm/entities/UsersTokens';

import { ICreateUsersTokensDTO } from '../dtos/ICreateUsersTokensDTO';

interface IUsersTokensRepository {
  create({ refresh_token, user_id, expires_date }: ICreateUsersTokensDTO): Promise<UsersTokens>;
  deleteByUserId(user_id: string): Promise<void>;
  findByIdAndRefresh(user_id: string, refresh: string): Promise<UsersTokens>;
  deleteUsersTokenById(id: string): Promise<void>;
  findBydRefreshToken(refresh_token: string): Promise<UsersTokens>;
}

export { IUsersTokensRepository };
}

export { IUsersTokensRepository };
```
### 💻 Create Repository (Implementations) `src/modules/users/infra/typeorm/repositories/UsersTokensRepository.ts`
```ts
import { getRepository, Repository } from 'typeorm';

import { ICreateUsersTokensDTO } from '@modules/users/dtos/ICreateUsersTokensDTO';
import { UsersTokens } from '@modules/users/infra/typeorm/entities/UsersTokens';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = getRepository(UsersTokens);
  }

  public async create({ refresh_token, user_id, expires_date }: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const repo = this.repository.create({ refresh_token, user_id, expires_date });
    const usersTokens = await this.repository.save(repo);
    return usersTokens;
  }

  public async deleteByUserId(user_id: string): Promise<void> {
    await this.repository.delete({ user_id });
  }

  public async findByIdAndRefresh(user_id: string, refresh: string): Promise<UsersTokens> {
    const usersTokens = await this.repository.findOne({ user_id, refresh_token: refresh });
    return usersTokens;
  }

  public async deleteUsersTokenById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
```

### 💻 Create DTO `src/modules/users/dtos/IAuthenticateUserDTO.ts`
```ts
interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

export { IAuthenticateUserDTO };
```

### 💻 Create Support `src/supports/CustomDate.ts`
```ts
import dayjs from 'dayjs';

class CustomDate {
  public static dateNow(): Date {
    const date = new Date();
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }

  public static addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}

export { CustomDate };
```

### 💻 Create Support `src/supports/Auth.ts`
```ts
class Auth {
  public static tokenString = 'app';
  public static tokenHash = 'd2a57dc1d883fd21fb9951699df71cc7';
  public static tokenExpireIn = '10m';
  public static refreshTokenString = 'app';
  public static refreshTokenHash = 'd2a57dc1d883fd21fb9951699df71cc7';
  public static refreshTokenExpireIn = '10d';
  public static refreshTokenExpireInDay = 10;
}

export { Auth };
```


### 💻 Create UseCase `src/modules/users/useCases/authenticateUser/AuthenticateUserUseCase.ts`
```ts
import { sign } from 'jsonwebtoken';
import { Auth } from 'supports/Auth';
import { CustomDate } from 'supports/CustomDate';
import { HashPassword } from 'supports/HashPassword';
import { inject, injectable } from 'tsyringe';

import { IAuthenticateUserDTO } from '@modules/users/dtos/IAuthenticateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IAuthenticateUser {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({ email, password }: IAuthenticateUserDTO): Promise<IAuthenticateUser> {
    const findUser = await this.userRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('Email or password invalid');
    }

    const comparePassword = await HashPassword.compare(password, findUser.password);

    if (!comparePassword) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, Auth.tokenHash, {
      subject: findUser.id,
      expiresIn: Auth.tokenExpireIn,
    });

    const refreshToken = sign({ email }, Auth.refreshTokenHash, {
      subject: findUser.id,
      expiresIn: Auth.refreshTokenExpireIn,
    });

    const refreshTokenExpireDate = CustomDate.addDays(Auth.refreshTokenExpireInDay);

    await this.usersTokensRepository.deleteByUserId(findUser.id);

    await this.usersTokensRepository.create({
      refresh_token: refreshToken,
      user_id: findUser.id,
      expires_date: refreshTokenExpireDate,
    });

    return {
      user: {
        name: findUser.name,
        email: findUser.email,
      },
      token: token,
      refreshToken: refreshToken,
    };
  }
}

export { AuthenticateUserUseCase };
```

### 💻 Create Controller `src/modules/users/useCases/authenticateUser/AuthenticateUserController.ts`
```ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/AuthenticateUserUseCase';

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserUseCase);
    const authenticate = await authenticateUser.execute({ email, password });
    return response.send(authenticate);
  }
}

export { AuthenticateUserController };
```

### Update Update file `src/shared/container/repositories/index.ts`
```ts
import { container } from 'tsyringe';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUsersTokensRepository>('UsersTokensRepository', UsersTokensRepository);
```

### 💻 Update `src/shared/infra/http/routes/users.routes.ts`
```ts
import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUserController.handle);
usersRoutes.post('/authenticate', authenticateUserController.handle);

export { usersRoutes };
```


### 💻 Test Routes
- POST => {{ _.baseURL }}/users/authenticate
  ```ts
  {
    "email":"carolina93@domain.tld",
    "password":"123456"
  }
  ```

### 💻 Create UseCase `src/modules/users/useCases/refreshToken/RefreshTokenUseCase.ts`
```ts
import { sign, verify } from 'jsonwebtoken';
import { Auth } from 'supports/Auth';
import { CustomDate } from 'supports/CustomDate';
import { inject, injectable } from 'tsyringe';

import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IResponse {
  newToken: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute(refreshToken: string): Promise<IResponse> {
    const { sub: user_id, email } = verify(refreshToken, Auth.refreshTokenHash) as { sub: string; email: string };

    const findUsersToken = await this.usersTokensRepository.findByIdAndRefresh(user_id, refreshToken);

    if (!findUsersToken) {
      throw new AppError('Refresh token does not exits');
    }

    await this.usersTokensRepository.deleteUsersTokenById(findUsersToken.id);

    const newRefreshToken = sign({ email }, Auth.refreshTokenHash, {
      subject: user_id,
      expiresIn: Auth.refreshTokenExpireIn,
    });

    await this.usersTokensRepository.create({
      refresh_token: newRefreshToken,
      user_id: user_id,
      expires_date: CustomDate.addDays(Auth.refreshTokenExpireInDay),
    });

    const newToken = sign({}, Auth.tokenHash, {
      subject: user_id,
      expiresIn: Auth.tokenExpireIn,
    });

    return {
      newToken,
      refreshToken,
    };
  }
}
export { RefreshTokenUseCase };
```

### 💻 Create Controller `src/modules/users/useCases/refreshToken/RefreshTokenUseCase.ts`
```ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const refreshToken = request.body.refreshToken || request.header['x-access-token'] || request.query.refreshToken;

    const useCase = container.resolve(RefreshTokenUseCase);
    const token = await useCase.execute(refreshToken);
    return response.json(token);
  }
}

export { RefreshTokenController };
```


### 💻 Update `src/shared/infra/http/routes/users.routes.ts`
```ts
import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { RefreshTokenController } from '@modules/users/useCases/refreshToken/RefreshTokenController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUserController.handle);
usersRoutes.post('/authenticate', authenticateUserController.handle);
usersRoutes.post('/refresh', refreshTokenController.handle);

export { usersRoutes };
```

### 💻 Test Routes
- POST => {{ _.baseURL }}/users/refresh
  ```ts
  {
    "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....???"
  }
  ```


### 💻 Create Support `src/supports/EtherealMail.ts`
```ts
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProviderDTO } from './dtos/IMailProviderDTO';

class EtherealMail {
  public static async mail({ to, subject, variables, templatePath }: IMailProviderDTO): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const templateFileContent = fs.readFileSync(templatePath).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    const client = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await client.sendMail({
      to: to,
      from: 'Rentalx <noreplay@test>',
      subject: subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMail };
```

### 💻 Create UseCase `src/modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase.ts`
```ts
import { resolve } from 'path';
import { CustomDate } from 'supports/CustomDate';
import { EtherealMail } from 'supports/EtherealMail';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('User does not exists');
    }

    const emailToken = uuidV4();
    const expires_date = CustomDate.addHours(1);
    const templatePath = resolve(__dirname, '..', '..', 'views', 'forgotPassword.hbs');

    await this.usersTokensRepository.create({
      refresh_token: emailToken,
      user_id: findUser.id,
      expires_date: expires_date,
    });

    const variables = {
      name: findUser.name,
      // OBS IN PRODUCTION USE .env for http://localhost:3333/accounts/reset?token
      link: `http://localhost:3333/accounts/reset?token=${emailToken}`,
    };

    await EtherealMail.mail({
      to: email,
      subject: 'Recuperação de senha',
      variables: variables,
      templatePath: templatePath,
    });
  }
}

export { SendForgotPasswordMailUseCase };
```

### 💻 Create Controller `src/modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController.ts`
```ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordMail = container.resolve(SendForgotPasswordMailUseCase);
    await sendForgotPasswordMail.execute(email);
    return response.send();
  }
}

export { SendForgotPasswordMailController };

```

### 💻 Update `src/shared/infra/http/routes/users.routes.ts`
```ts
import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { RefreshTokenController } from '@modules/users/useCases/refreshToken/RefreshTokenController';
import { SendForgotPasswordMailController } from '@modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUserController.handle);
usersRoutes.post('/authenticate', authenticateUserController.handle);
usersRoutes.post('/refresh', refreshTokenController.handle);
usersRoutes.post('/forgot', sendForgotPasswordMailController.handle);

export { usersRoutes };
```

### 💻 Test Routes
- POST => {{ _.baseURL }}/users/forgot
  ```ts
  {
	  "email":"carolina93@domain.tld"
  }
  ```


### 💻 Create DTO `src/modules/users/dtos/IResetPasswordDTO.ts`
```ts
interface IResetPasswordDTO {
  token: string;
  password: string;
}

export { IResetPasswordDTO };
```
### 💻 Create file `src/modules/users/useCases/resetPassword/ResetPasswordUseCase.ts`
```ts
import { CustomDate } from 'supports/CustomDate';
import { HashPassword } from 'supports/HashPassword';
import { inject, injectable } from 'tsyringe';

import { IResetPasswordDTO } from '@modules/users/dtos/IResetPasswordDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ token, password }: IResetPasswordDTO): Promise<void> {
    const findUserToken = await this.usersTokensRepository.findBydRefreshToken(token);
    if (!findUserToken) {
      throw new AppError('Token expired');
    }

    const compareDate = CustomDate.compareIfBefore(findUserToken.expires_date, CustomDate.dateNow());

    if (compareDate) {
      throw new AppError('Token expired');
    }

    const findUser = await this.usersRepository.findById(findUserToken.user_id);

    findUser.password = await HashPassword.hash(password);

    await this.usersRepository.create(findUser);

    await this.usersTokensRepository.deleteUsersTokenById(findUserToken.id);

    // console.log({
    //   token,
    //   password,
    //   findUserToken,
    //   expires_date: findUserToken.expires_date,
    //   now: CustomDate.dateNow(),
    //   compareDate,
    //   findUser,
    // });
  }
}

export { ResetPasswordUseCase };
```

### 💻 Create Controller `src/modules/users/useCases/resetPassword/ResetPasswordController.ts`
```ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({
      token: String(token),
      password: password,
    });

    return response.send();
  }
}

export { ResetPasswordController };
```

### 💻 Update `src/shared/infra/http/routes/users.routes.ts`
```ts
import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { RefreshTokenController } from '@modules/users/useCases/refreshToken/RefreshTokenController';
import { ResetPasswordController } from '@modules/users/useCases/resetPassword/ResetPasswordController';
import { SendForgotPasswordMailController } from '@modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUserController.handle);
usersRoutes.post('/authenticate', authenticateUserController.handle);
usersRoutes.post('/refresh', refreshTokenController.handle);
usersRoutes.post('/forgot', sendForgotPasswordMailController.handle);
usersRoutes.post('/reset', resetPasswordController.handle);

export { usersRoutes };
```

### 💻 Test Route

- Post {{ _.baseURL }}/users/reset?token=94d31f32-a963-436e-ab18-33fca80d182d
  ```json
  {
    "password":"123456"
  }

  ```

# NodeJS, typescript template

### Install Multer [multer](https://github.com/expressjs/multer#readme)

```bash
yarn add multer
```

```bash
yarn add @types/multer -D
```

### Install CSV [csv-parse](https://csv.js.org/parse/)

```bash
yarn add csv-parse
```

### Create file file.csv in root project
```
admin,Augusto Monteiro
user,Marilene Monteiro
user,Flavia Monteiro
```

### Create new Request in Insomnia | {{ _.baseURL }}/import

- name        : import
- method      : post
- structured  : Multipart Form



### Create file `src/routes/importcsv.routes.ts`

```typescript
import csvParse from 'csv-parse';
import { Request, Response, Router } from 'express';
import fs from 'fs';
import multer from 'multer';

const importCSVRoute = Router();

const upload = multer({
  dest: './tmp',
});

interface IUser {
  profile: string;
  name: string;
}

async function loadFile(file: Express.Multer.File) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file.path);
    const parseFile = csvParse();
    const users: IUser[] = [];
    stream.pipe(parseFile);
    parseFile
      .on('data', async line => {
        const [profile, name] = line;
        users.push({
          profile: profile,
          name: name,
        });
      })
      .on('end', () => {
        resolve(users);
        fs.promises.unlink(file.path);
      })
      .on('error', err => {
        reject(err);
      });
  });
}

importCSVRoute.post(
  '/',
  upload.single('file'),
  async (request: Request, response: Response): Promise<Response> => {
    const { file } = request;
    const users = await loadFile(file);
    return response.json(users);
  },
);

export { importCSVRoute };
```

### Start application
```bash
yarn dev
```

### Import form database SQlite

#### Instal dependencies

```bash
yarn add reflect-metadata sqlite3 typeorm
```

### Update package.json add in scripts `"typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js"`
```json
"scripts": {
  "build": "tsc",
  "dev:server": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
  "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js"
}
```

### Create file ormconfig.json in root project
```json
{
  "type": "sqlite",
  "database": "./src/database/database.sqlite",
  "migrations": ["./src/database/migrations/*.ts"],
  "entities": ["./src/entities*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
```

### Update `src/server.ts`
```bash
import express from 'express';

import 'express-async-errors';
import { errorsMiddleware } from './errors/AppError';
import { routes } from './routes/index.routes';

import './database';

const app = express();

app.use(express.json());

app.use(routes);
app.use(errorsMiddleware);

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});
```

### Stop (ctrl+C) and Start application
```bash
yarn dev
```

### Create migration User (profile, name)

```bash
yarn typeorm migration:create -n CreateUsers
```

### Update file migration
```typescript
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers???????????????? implements MigrationInterface {
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
            name: 'profile',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
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

### Execute migration
```bash
yarn typeorm migration:run
```


### uncomment in `tsconfig.json`
```json
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
```


### Create file `src/entities/User.ts`
```typescript
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  profile: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
```
### Create repository `src/repositories/UsersRepository.ts`

```typescript
import { getRepository, Repository } from 'typeorm';

import { User } from '../entities/User';

export interface ICreateUserDTO {
  profile: string;
  name: string;
}

class UsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }

  public async create({ profile, name }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      profile,
      name,
    });

    await this.repository.save(user);
  }

  public async all(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  public async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({ name: name });
    return user;
  }
}

export { UsersRepository };
```

### Update `src/routes/importcsv.routes.ts`

```typescript
import csvParse from 'csv-parse';
import { Request, Response, Router } from 'express';
import fs from 'fs';
import multer from 'multer';

import { ICreateUserDTO, UsersRepository } from '../repositories/UsersRepository';

const importCSVRoute = Router();

const upload = multer({
  dest: './tmp',
});

async function loadFile(file: Express.Multer.File): Promise<ICreateUserDTO[]> {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file.path);
    const parseFile = csvParse();
    const users: ICreateUserDTO[] = [];
    stream.pipe(parseFile);
    parseFile
      .on('data', async line => {
        const [profile, name] = line;
        users.push({
          profile: profile,
          name: name,
        });
      })
      .on('end', () => {
        resolve(users);
        fs.promises.unlink(file.path);
      })
      .on('error', err => {
        reject(err);
      });
  });
}

importCSVRoute.post('/', upload.single('file'), async (request: Request, response: Response): Promise<Response> => {
  const { file } = request;
  const users: ICreateUserDTO[] = await loadFile(file);
  const userRepository = new UsersRepository();

  users.map(async user => {
    const findUser = await userRepository.findByName(user.name);
    if (!findUser) {
      await userRepository.create({
        profile: user.profile,
        name: user.name,
      });
    }
  });
  return response.json({ message: 'Check you sqlite and confirm importation' });
});

importCSVRoute.get('/', async (request: Request, response: Response): Promise<Response> => {
  const userRepository = new UsersRepository();

  const users = await userRepository.all();

  return response.json(users);
});

export { importCSVRoute };

```

### Import file in Insomnia and test the routes

- Post {{ _.baseURL }}/import -> Multpart form, file
- Get {{ _.baseURL }}/import


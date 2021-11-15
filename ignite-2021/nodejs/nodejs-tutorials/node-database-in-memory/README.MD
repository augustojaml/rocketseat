# Starting a node project with sample CRUD Users

### Follow the tutorial - [tutorial](https://www.notion.so/Fast-Nodejs-express-eslint-and-prettier-24b36cf5acfc4869aafba0e31cb12b62)


### Install support Errors
```bash
yarn add express-async-errors
```

### Create support errors in `src\erros\supportErrors.ts`
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

const AppErrorMiddleware = (
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

export { AppError, AppErrorMiddleware };

```



### Install uuid
```bash
yarn add uuid
```

### Create Model User in `src\modules\users\models\User.ts`
```typescript
import { v4 as uuidV4 } from 'uuid';

class User {
  id?: string;
  name: string;
  email: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
```

### Create Repository Interface in `src\modules\users\repositories\IUsersRepository.ts`
```typescript
import { User } from '../models/User';

export interface IUserDTO {
  name: string;
  email: string;
}

interface IUsersRepository {
  index(): Promise<User[]>;
  store({ name, email }: IUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(user: User): Promise<User>;
  findById(id: string): Promise<User>;
  destroy(id: string): Promise<void>;
}

export { IUsersRepository };
```

### Create Respository in `src\modules\users\repositories\implementations\UsersRepository.ts`
```typescript
import { User } from '../../models/User';
import { IUserDTO, IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: User[];
  private static INSTANCE: UsersRepository;
  private constructor() {
    this.repository = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }
    return UsersRepository.INSTANCE;
  }

  public async index(): Promise<User[]> {
    const users = this.repository;
    return users;
  }

  public async store({ name, email }: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name: name,
      email: email,
      created_at: new Date(),
    });
    this.repository.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = this.repository.find(user => user.email === email);
    return user;
  }

  public async update(user: User): Promise<User> {
    const findUser = await this.findById(user.id);
    findUser.name = user.name;
    findUser.email = user.email;
    return findUser;
  }

  public async findById(id: string): Promise<User> {
    const user = this.repository.find(user => user.id === id);
    return user;
  }

  public async destroy(id: string): Promise<void> {
    const user = await this.findById(id);
    const index = this.repository.indexOf(user);
    this.repository.splice(index, 1);
  }
}

export { UsersRepository };
```

### UseCases

<div style="background: #ccc; color: #111; padding: 1rem">createUser </div>

#### Create useCase in src\modules\users\useCases\createUser\CreateUserUsecase.ts

  ```typescript
  import { AppError } from '../../../../erros/supportErrors';
  import { User } from '../../models/User';
  import { IUsersRepository } from '../../repositories/IUsersRepository';

  interface IUserRequest {
    name: string;
    email: string;
  }

  class CreateUserUsecase {
    constructor(private repository: IUsersRepository) {}

    public async execute({ name, email }: IUserRequest): Promise<User> {
      const existingUser = await this.repository.findByEmail(email);
      if (existingUser) {
        throw new AppError(`User already exists`);
      }

      const user = await this.repository.store({ name, email });

      return user;
    }
  }

  export { CreateUserUsecase };
  ```

#### Create controller in src\modules\users\useCases\createUser\CreateUserController.ts

```typescript
import { Request, Response } from 'express';

import { CreateUserUsecase } from './CreateUserUsecase';

class CreateUserController {
  constructor(private createUser: CreateUserUsecase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const user = await this.createUser.execute({ name, email });
    return response.json(user);
  }
}
export { CreateUserController };
```

#### Create index in src\modules\users\useCases\createUser\index.ts
```typescript
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUsecase } from './CreateUserUsecase';

const usersRepository = UsersRepository.getInstance();
const createUserUsecase = new CreateUserUsecase(usersRepository);
const createUserController = new CreateUserController(createUserUsecase);

export { createUserController };
```

<div style="background: #ccc; color: #111; padding: 1rem">deleteUser </div>

#### Create useCase in src\modules\users\useCases\deleteUser\DeleteUserUsecase.ts

```typescript
import AppError from '../../../../erros/AppError';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

class DeleteUserUsecase {
  constructor(private repository: UsersRepository) {}

  public async execute(id: string): Promise<void> {
    const findUser = await this.repository.findById(id);
    if (!findUser) {
      throw new AppError('No-existent user');
    }
    await this.repository.destroy(id);
  }
}

export { DeleteUserUsecase };
```


#### Create controller in src\modules\users\useCases\deleteUser\DeleteUserController.ts

```typescript
import { Request, Response } from 'express';

import { DeleteUserUsecase } from './DeleteUserUsecase';

class DeleteUserController {
  constructor(private deleteUser: DeleteUserUsecase) {}
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      await this.deleteUser.execute(id);
      return response.send();
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { DeleteUserController };
```

#### Create index in src\modules\users\useCases\deleteUser\index.ts

```typescript
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUsecase } from './DeleteUserUsecase';

const useRepository = UsersRepository.getInstance();
const deleteUserUsecase = new DeleteUserUsecase(useRepository);
const deleteUseController = new DeleteUserController(deleteUserUsecase);

export { deleteUseController };
```

<div style="background: #ccc; color: #111; padding: 1rem">listUser </div>

#### Create useCase in src\modules\users\useCases\listUser\ListUsersUseCase.ts

```typescript
import { User } from '../../models/User';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

class ListUsersUseCase {
  constructor(private repository: UsersRepository) {}

  public async execute(): Promise<User[]> {
    const users = await this.repository.index();
    return users;
  }
}

export { ListUsersUseCase };
```


#### Create controller in src\modules\users\useCases\listUser\ListUsersController.ts

```typescript
import { Request, Response } from 'express';

import { ListUsersUseCase } from './ListUsersUsecase';

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}
  public async handle(request: Request, response: Response): Promise<Response> {
    const users = await this.listUsersUseCase.execute();
    return response.status(200).json(users);
  }
}

export { ListUsersController };
```

#### Create index in src\modules\users\useCases\listUser\index.ts

```typescript
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { ListUsersController } from './ListUsersController';
import { ListUsersUseCase } from './ListUsersUsecase';

const usersRepository = UsersRepository.getInstance();
const listUsersUserCase = new ListUsersUseCase(usersRepository);
const listUsersController = new ListUsersController(listUsersUserCase);

export { listUsersController };
```

<div style="background: #ccc; color: #111; padding: 1rem">showUser </div>

#### Create useCase in src\modules\users\useCases\showUser\ShowUserUsecase.ts

```typescript
import AppError from '../../../../erros/AppError';
import { User } from '../../models/User';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

class ShowUserUsecase {
  constructor(private repository: UsersRepository) {}
  public async execute(id: string): Promise<User> {
    const findUser = await this.repository.findById(id);

    if (!findUser) {
      throw new AppError('No-existent user');
    }
    return findUser;
  }
}

export { ShowUserUsecase };
```


#### Create controller in src\modules\users\useCases\showUser\ShowUserController.ts

```typescript
import { Request, Response } from 'express';

import { ShowUserUsecase } from './ShowUserUsecase';

class ShowUserController {
  constructor(private showUser: ShowUserUsecase) {}
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = await this.showUser.execute(id);
    return response.json(user);
  }
}

export { ShowUserController };
```

#### Create index in src\modules\users\useCases\showUser\index.ts

```typescript
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { ShowUserController } from './ShowUserController';
import { ShowUserUsecase } from './ShowUserUsecase';

const usersRepository = UsersRepository.getInstance();
const showUser = new ShowUserUsecase(usersRepository);
const showUserController = new ShowUserController(showUser);

export { showUserController };
```

<div style="background: #ccc; color: #111; padding: 1rem">updateUser </div>

#### Create useCase in src\modules\users\useCases\updateUser\UpdateUserUsecase.ts

```typescript
import AppError from '../../../../erros/AppError';
import { User } from '../../models/User';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateUserUsecase {
  constructor(private repository: UsersRepository) {}
  public async execute({ id, name, email }: IRequest): Promise<User> {
    const findUser = await this.repository.findById(id);

    if (!findUser) {
      throw new AppError('No-existent user');
    }

    findUser.name = name;
    findUser.email = email;

    const user = await this.repository.update(findUser);
    return user;
  }
}

export { UpdateUserUsecase };
```


#### Create controller in src\modules\users\useCases\updateUser\UpdateUserController.ts

```typescript
import { Request, Response } from 'express';

import { UpdateUserUsecase } from './UpdateUserUsecase';

class UpdateUserController {
  constructor(private updateUser: UpdateUserUsecase) {}
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;
    const user = await this.updateUser.execute({ id, name, email });
    return response.json(user);
  }
}

export { UpdateUserController };
```

#### Create index in src\modules\users\updateUser\showUser\index.ts

```typescript
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUsecase } from './UpdateUserUsecase';

const usersRepository = UsersRepository.getInstance();
const updateUser = new UpdateUserUsecase(usersRepository);
const updateUserController = new UpdateUserController(updateUser);

export { updateUserController };
```
### Create users.routes.ts in src\routes\users.routes.ts
```typescript
import { Request, Response, Router } from 'express';

import { createUserController } from '../modules/users/Usecase/createUser';
import { deleteUseController } from '../modules/users/Usecase/deleteUser';
import { listUsersController } from '../modules/users/Usecase/listUser';
import { showUserController } from '../modules/users/Usecase/showUser';
import { updateUserController } from '../modules/users/Usecase/updateUser';

const usersRoutes = Router();

usersRoutes.get('/', (request: Request, response: Response) => {
  return listUsersController.handle(request, response);
});

usersRoutes.get('/:id', (request: Request, response: Response) => {
  return showUserController.handle(request, response);
});

usersRoutes.post('/', (request: Request, response: Response) => {
  return createUserController.handle(request, response);
});

usersRoutes.put('/:id', (request: Request, response: Response) => {
  return updateUserController.handle(request, response);
});

usersRoutes.delete('/:id', (request: Request, response: Response) => {
  return deleteUseController.handle(request, response);
});

export { usersRoutes };
```

### Create index.routes.ts in src\routes\index.routes.ts
```typescript
import { Router } from 'express';

import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);

export { routes };

```




### Update Server.ts
```typescript
import express from 'express';

import 'express-async-errors';
import AppErrorMiddleware from './erros/AppErrorMiddleware';
import { routes } from './routes/index.routes';

const app = express();

app.use(express.json());

app.use(routes);
app.use(AppErrorMiddleware);

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});
```

### Execute
```bash
yarn dev
```

### Test the routes

- GET {{ _.baseURL }}/users
- POST {{ _.baseURL }}/users
- PUT {{ _.baseURL }}/users/:id
- GET {{ _.baseURL }}/users/:id
- DELETE {{ _.baseURL }}/users/:id




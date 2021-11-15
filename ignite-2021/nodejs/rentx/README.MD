# Test

- Teste unitários = Teste de pedaços de códigos, sucesso, erros

- Teste de integração = Testar a aplicação a aplicação inteira

### TDD -> Metodologia -> Test Drive Development

- Vantagem => Se uma regra muda, os testes irão prever erros
- Desvantagem => curva de aprendizado da ferramento
# JEST

- [Documentação](https://jestjs.io/pt-BR/)

- Install
  ```bash
  yarn add jest ts-jest @types/jest -D
  ````

- Inicializar
  ```bash
  yarn jest --init
  ```
  - Would you like to use Jest when running "test" script in "package.json"? `yes`
  - Would you like to use Typescript for the configuration file? `yes`
  - Would you like to use Typescript for the configuration file? `node`
  - Do you want Jest to add coverage reports? `no`
  - Which provider should be used to instrument code for coverage? `v8`
  - Automatically clear mock calls and instances between every test? `yes`

- Configurar jest.config.ts
  - preset: 'ts-jest'
  - testMatch: ['**/*.spec.ts'],
  - bail: true,

- Add script in package.json
  ```json
  "test": "NODE_ENV=test jest --runInBand --detectOpenHandles"
  ```

- Update jest.config.ts
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
# Super Test

- [Super Test](https://www.npmjs.com/package/supertest)

- Install
  ```bash
  yarn add supertest
  ```

    ```bash
  yarn add  @types/supertest -D
  ```

- Update package.json
  ```json
  "test": "NODE_ENV=test jest --runInBand --detectOpenHandles"
  ```

- Create Database of test
  ```sql
  CREATE DATABASE rentx_test
  ```

- Update connections with name database created
  ```ts
  import { Connection, createConnection as connection, getConnectionOptions } from 'typeorm';

  const createConnection = async (host = 'localhost'): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    return connection(
      Object.assign(defaultOptions, {
        host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
        database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database,
      }),
    );
  };

  export { createConnection };
  ```
### Documentation Swagger

- Link [Swagger](https://swagger.io)
- Package [Swagger npm](https://www.npmjs.com/package/swagger-ui-express)

- Install

```bash
yarn add swagger-ui-express
```

```bash
yarn add @types/swagger-ui-express
```

- create file `src/swagger.json`

- update add lines bellow in you `app.ts` or `server.ts`
  ```ts
  import swaggerUi from 'swagger-ui-express';
  import swaggerFile from '../../../swagger.json';
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  ```


# Usar aws

- Criar conta aws
- Criar usuário -> service, pesquisar por IAM e clicar, clicar em usuarios, adicionar usuário, digite o nome do usuário, marque acesso programático, clique em `proximo; Permissões`. Clique em anexar políticas existentes de forma direta, procure por S3, marque `AmazonS3FullAccess`. Clique em Próximo; Tags, Clique em próximo revisar e criar usuário.
- Copie ID da chave de acesso e Chave de acesso secreta

- Clique e service novamente e procure por S3, clique nele, e depois em criar bucket, de o nome para o bucket, e `desmarque bloquear todo o acesso publico`, marque -> `Reconheço que as configurações atuais podem fazer com que este bucket e os objetos dentro dele se tornem públicos`. clique em criar bucket

- Configurando bucket no projeto
  - install dependency
    ```bash
    yarn add aws-sdk
    ```
  - [Credentials in Node.js](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html)

    - AWS_BUCKET(nome do bucket)
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - AWS_SESSION_TOKEN

  - Install `yarn add mime`
  - Install `yarn add @types/mime -D`


- [class-tronsforme](https://www.npmjs.com/package/class-transformer)

- [node-rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible)


- [Sentry](https://sentry.io/welcome/?utm_source=google&utm_medium=cpc&utm_campaign=9657410528&utm_content=g&utm_term=sentry.io&gclid=CjwKCAjwh5qLBhALEiwAioods5XDS9JnjRWmAoDBDJhT4l4aAmbM16h-L2NGOAN15uouroHYCs1q6xoCE4kQAvD_BwE)

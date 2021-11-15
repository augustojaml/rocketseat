# Express, Typescript, Primic

### Primisc

- [prisma](https://www.prisma.io/docs/getting-started)

- Install

  ```bash
  yarn add prisma -D
  ```

- Init

  ```bash
  yarn prisma init
  ```

- Remove all text in .env

- Config `prisma/schema.prisma` with sql

  ```prisma
    datasource db {
      provider = "sqlite"
      url      = "file:./dev.db"
    }

    generator client {
      provider = "prisma-client-js"
    }
  ```

- Github -> https://github.com/settings/developers -> OAuth Apps -> New OAuth App -> Name Register

  - Application name: nlw5node
  - Homepage URL: http://localhost:4000
  - Application description: NLW Heat Node
  - http://localhost:4000/sign/callback
  - Register application
  - Copy client id and client secret

- Test Route

  - Install dependency dotenv for use variable environnement
    ```bash
    yarn add dotenv
    ```
  - Update `src/app.ts`

    ```ts
    import 'dotenv/config';
    import express from 'express';

    const app = express();

    app.get('/github', (request, response) => {
      response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
      );
    });

    app.listen(4000, () => console.log(`Serve running in port 4000 🚀`));
    ```

  - Install axios

  - Socket io [socket.io](https://socket.io)

# IGNEWS

### Creating project

```bash
yarn create next-app ignews
```

### Refactoring project

- Create folder `src` and move folder `page` for into `src`
- Remove files in public files
- Remove folder `api` into the `page`

### Installing typescript

```bash
yarn add typescript @types/react @types/node -D
```

### Rename files

- `src/pages/_app.js` for `src/pages/_app.tsx`
- `src/pages/index.js` for `src/pages/index.tsx`

### Update `src/pages/_app.tsx`

```ts
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

### Install SASS

```bash
yarn add sass
```

### Create file `src/pages/_document.tsx`

```ts
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class AppDocument extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### Example css Global `src/styles/global.scss`

```scss
:root {
  --white: #ffffff;

  --gray-100: #e1e1e6;
  --gray-300: #a8a8b3;
  --gray-900: #121214;

  --cyan-500: #61dafd;

  --yellow-500: #eba417;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--gray-900);
  color: var(--white);
}

@media (max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}
/*MEDIA SCREEN*/
@media (max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}

body,
input,
textarea,
select,
button {
  font: 400 1rem 'Roboto', sans-serif;
}

button {
  cursor: pointer;
  transition: filter 0.2s;
}

button:hover {
  filter: brightness(0.8);
}

a {
  color: inherit;
  text-decoration: none;
}
```

### Install `React Icons`

- [React Icons](https://react-icons.github.io/react-icons/)

```bash
yarn add react-icons
```

### Stripe

[Stripe](https://stripe.com/br)

- Access => https://dashboard.stripe.com/test/products?active=true -> Add product

  - add name
  - add price
  - Choose between One time or Recurring
  - Select `Billing period` and Save Product

- Access => https://dashboard.stripe.com/test/apikeys

  - copy `Publishable key` and `Secret key`

- Access product created and copy `API ID` of product

- Create in root project `.env.local`:

  - STRIPE_API_PUBLIC_KEY=
  - STRIPE_API_SECRET_KEY=
  - STRIPE_API_PRODUCT_ID=

- Create file `src/services/stripe.ts`

  ```ts
  import Stripe from 'stripe';

  const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'ig.news',
      version: '1.0.0',
    },
  });

  export default stripe;
  ```

- Get info product stripe

  ```ts
  const price = await stripe.prices.retrieve('price_1IkxxYGLKpPSdJzBFH0DLPHY');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };
  ```

### NextAuth.js (Github)

- Access `https://github.com/settings/applications/new`
  put `Application name`
  put `Homepage URL` => `http://localhost:3000`
  put `Authorization callback URL` => `http://localhost:3000/api/auth/callback`

- To add NextAuth.js to a project create a file called [...nextauth].js in `pages/api/auth`

### Update .env.local in root project

- STRIPE_API_PUBLIC_KEY=
- STRIPE_API_SECRET_KEY=
- STRIPE_API_PRODUCT_ID=
- GITHUB_CLIENT_ID=
- GITHUB_CLIENT_SECRET=

```ts
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),
  ],
});
```

- Install dependencies

  ```bash
  yarn add next-auth
  ```

  ```bash
  yarn add @types/next-auth -D
  ```

### Add Provider in `src/pages/_app.tsx`

```ts
import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </>
  );
}

export default MyApp;
```

### User actions in your sign actions

```ts
import { signIn, useSession } from 'next-auth/client';
```

### FaunaDB

- [FaunaDB](https://fauna.com/)

- Select `CREATE DATABASE` https://dashboard.fauna.com/?createDb=true
- Open or select database created and select `Security`
- put `Key Name`, copy `YOUR KEYS SECRET IS` and add in `.env.local`

- Select `Collections` and `NEW COLLECTION`
- add name and save
- Select `Indexes` put `user_by_email` and Terms `data.email`, check `unique` and save

- Instal SDK fauna
  ```bash
  yarn add faunadb
  ```

### Obs: config Public email in `https://github.com/settings/profile`

### Create service `src/services/fauna.ts`

```ts
import { Client } from 'faunadb';

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
});
```

- [fauna query](https://docs.fauna.com/fauna/current/api/fql/cheat_sheet)

### NextAuth Callbacks

```ts
callbacks: {
async signIn(user, account, profile) {
console.log(user);
return true;
},
```

### Create api routes subscribe

- install dependencies axios;

  ```bash
  yarn add axios
  ```

- install dependencies stripe-js

  ```bash
  yarn add yarn add @stripe/stripe-js
  ```

  ```ts
  import { loadStripe } from '@stripe/stripe-js';

  export async function getStripeJs() {
    const stripeJs = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_API_PUBLIC_KEY
    );
    return stripeJs;
  }
  ```

- stripe cli

  - [github](https://github.com/stripe/stripe-cli)
  - [Doc Install](https://stripe.com/docs/stripe-cli#install)

- Usage

  ```bash
  stripe login
  ```

  - Create route `src/pages/api/webhooks.ts`

    ```ts
    import { NextApiRequest, NextApiResponse } from 'next';
    export default async (
      request: NextApiRequest,
      response: NextApiResponse
    ) => {
      console.log('received event');
      response.status(200).json({ ok: true });
    };
    ```

    ```bash
    stripe listen --forward-to localhost:3000/api/webhooks --latest
    ```

### Prismic

- [Primisc](https://prismic.io)

- For new project fallow =>https://prismic.io/dashboard/new-repository

  - Put `repository name`, `in What is you role/job title` => Developers and W`hat technology do you plan to use in your repository` => Nestjs

  - Next screen `What’s the main language you will be writing content in?` => Portugues - Brasil

  - Select `Custom type` => Repeatable Type, put name and `Create new custom type`

  - Create some posts

  - Go to `https://jamlrocketseatignews.prismic.io/settings/apps/`

  - API access => Private API - Require an access token for any request

  - Generate an Access Token and put Application Name and Add this application

  - Copy Client ID and Client Secret, and API endpoint

  - Create file `src/services/prismic.ts`

    ```ts
    import Prismic from '@prismicio/client';

    export function getPrismicClient(req?: unknown) {
      const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
        req: req,
        accessToken: process.env.PRISMIC_PERMANENT_ACCESS_TOKEN,
      });

      return prismic;
    }
    ```

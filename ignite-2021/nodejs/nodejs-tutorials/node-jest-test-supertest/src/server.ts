import express, { Request, Response } from 'express';

const app = express();

app.get('/', (request: Request, response: Response) => {
  response.json({ message: 'Hello Typescript com Nodejs, Express, Eslint e Prettier' });
});

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});

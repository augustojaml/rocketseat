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

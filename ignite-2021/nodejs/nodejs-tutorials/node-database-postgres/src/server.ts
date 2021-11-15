import express from 'express';
import 'express-async-errors';

import './database';
import './shared/containers';

import { appErrorMiddleware } from './errors/AppError';
import { routes } from './routes/index.routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(appErrorMiddleware);

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});

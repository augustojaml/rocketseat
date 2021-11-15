import express from 'express';

import 'express-async-errors';
import { AppErrorMiddleware } from './erros/supportErrors';
import { routes } from './routes/index.routes';

const app = express();

app.use(express.json());

app.use(routes);
app.use(AppErrorMiddleware);

app.listen(3333, () => {
  console.log('Server run in port 3333 🚀');
});

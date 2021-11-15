import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';

import createConnection from './database/createConnections';
import { AppError } from './errors/AppError';
import { routes } from './routes/index.routes';

createConnection();

const app = express();

app.use(express.json());

app.use(routes);
app.use(AppError.middleware);

export { app };

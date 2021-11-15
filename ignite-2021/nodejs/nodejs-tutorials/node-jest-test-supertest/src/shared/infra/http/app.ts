import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import '@shared/container';
import { createConnection } from '../database';

createConnection();

const app = express();

app.use(express.json());
app.use(router);
app.use(AppError.middleware);

export { app };

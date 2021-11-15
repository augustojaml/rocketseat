import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import { AppError } from '@shared/errors/AppError';
import { createConnection } from '@shared/infra/database';
import { router } from '@shared/infra/http/routes';
import '@shared/container';

createConnection();

const app = express();

app.use(express.json());
app.use(router);
app.use(AppError.middleware);

export { app };

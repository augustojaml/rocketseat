import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import 'express-async-errors';
import '@shared/container';

import { StorageSupport } from '@support/StorageSupport';

import { AppError } from '../middlewares/errors/AppError';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(AppError.middleware);

app.use('/avatar', express.static(`${StorageSupport.paths.storage}/avatar`));

export { app };

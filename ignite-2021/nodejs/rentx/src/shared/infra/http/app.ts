import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';
import '@shared/container';

import { storage } from '@config/storage';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { AppError } from '@shared/errors/AppError';
import { rateLimiter } from '@shared/infra/http/middleware/rateLimiter';
import { routes } from '@shared/infra/http/routes/index.routes';
import { createConnection } from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/avatar', express.static(`${storage.storage}/avatar`));
app.use('/cars', express.static(`${storage.storage}/cars`));
app.use(routes);
app.use(AppError.middleware);
app.use(Sentry.Handlers.errorHandler());
export { app };

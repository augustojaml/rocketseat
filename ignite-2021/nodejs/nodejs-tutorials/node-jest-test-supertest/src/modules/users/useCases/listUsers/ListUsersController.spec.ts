import request from 'supertest';
import { Connection } from 'typeorm';

import { createConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('List User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to list all users', async () => {
    await request(app).post('/users').send({
      name: 'user-1',
      email: 'user-1@test',
    });
    await request(app).post('/users').send({
      name: 'user-2',
      email: 'user-2@test',
    });
    await request(app).post('/users').send({
      name: 'user-3',
      email: 'user-3@test',
    });

    const { body: data } = await request(app).get('/users');

    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'user-1', email: 'user-1@test' }),
        expect.objectContaining({ name: 'user-2', email: 'user-2@test' }),
        expect.objectContaining({ name: 'user-3', email: 'user-3@test' }),
      ]),
    );
  });
});

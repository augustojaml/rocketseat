import request from 'supertest';
import { Connection } from 'typeorm';

import { createConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new User', async () => {
    const { body: data } = await request(app).post('/users').send({
      name: 'user-1',
      email: 'user-1@test',
    });

    expect(data).toEqual(expect.objectContaining({ name: 'user-1', email: 'user-1@test' }));
  });
});

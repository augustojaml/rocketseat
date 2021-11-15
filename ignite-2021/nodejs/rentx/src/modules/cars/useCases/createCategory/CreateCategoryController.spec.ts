import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import { createConnection } from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const password = await hash('admin', 8);
    const uuid = uuidV4();
    // drive_license
    await connection.query(`
      INSERT INTO
        users(id, name, password, email, drive_license, "is_admin", created_at)
      VALUES
        ('${uuid}', 'admin', '${password}', 'admin@rentalx.com', 'ABC-3210', true, 'now()')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new category', async () => {
    const responseToken = await request(app).post('/accounts/authenticate').send({
      email: 'admin@rentalx.com',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'category-1',
        description: 'description-1',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.body).toEqual(expect.objectContaining({ name: 'category-1', description: 'description-1' }));
  });
});

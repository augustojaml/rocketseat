import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { createConnection } from '@shared/infra/typeorm';

async function create() {
  const connection = await createConnection();
  const uuid = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(`DELETE FROM users WHERE name = 'admin'`);

  await connection.query(`
    INSERT INTO
      users(id, name, password, email, drive_license, "is_admin", created_at)
    VALUES
      ('${uuid}', 'admin', '${password}', 'admin@email.com', 'ABC-3210', true, 'now()')
  `);

  await connection.close();
}

create().then(() => console.log('User admin created 🛡️'));

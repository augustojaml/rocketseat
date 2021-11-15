import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../createConnections';

async function create() {
  const connection = await createConnection();
  const hashPassword = await hash('root', 8);

  await connection.query(`DELETE FROM users WHERE email = 'admin@email.com'`);

  await connection.query(`
    INSERT INTO
      users (id, name, email, password, is_admin, created_at)
    VALUES
      ('${uuidV4()}', 'admin', 'admin@email.com', '${hashPassword}', true, 'now()')
  `);
  await connection.close();
}
create().then(() => console.log('User admin created 🛡️'));

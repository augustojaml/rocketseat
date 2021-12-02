import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { User } from './model/User';
import { schemas } from './schema';

const adapter = new SQLiteAdapter({
  schema: schemas,
});

const database = new Database({
  adapter,
  modelClasses: [User],
});

export { database };
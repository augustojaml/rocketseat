import { Connection, createConnection as connection, getConnectionOptions } from 'typeorm';

const createConnection = async (host = 'localhost'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return connection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database,
    }),
  );
};

export { createConnection };

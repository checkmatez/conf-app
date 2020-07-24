const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    extension: 'ts',
    stub: './migrations/_stub.ts',
  },
  seeds: {
    directory: './seeds',
  },
  debug: isDev,
  asyncStackTraces: isDev,
}

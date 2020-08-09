import Knex from 'knex'
import { ENV } from '../config/constants'
import { logger } from '../logger/pino'

export const knex = Knex({
  client: 'pg',
  version: '11.2',
  connection: {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    database: ENV.DB_NAME,
    user: ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
  },
  searchPath: ['knex', 'public'],
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: ENV.isDevelopment ? './migrations' : './migrations-dist',
    extension: 'ts',
  },
  seeds: {
    directory: './seeds',
  },
  log: {
    debug: logger.debug.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
  },
  debug: ENV.isDevelopment,
  asyncStackTraces: ENV.isDevelopment,
})

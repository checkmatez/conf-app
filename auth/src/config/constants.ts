import { cleanEnv } from 'envalid'

export const ENV = cleanEnv(
  process.env,
  {
    JWT_SECRET: { type: 'string', _parse: String },
    PORT: { type: 'number', _parse: Number },
    DB_HOST: { type: 'string', _parse: String },
    DB_PORT: { type: 'number', _parse: Number },
    DB_NAME: { type: 'string', _parse: String },
    DB_USERNAME: { type: 'string', _parse: String },
    DB_PASSWORD: { type: 'string', _parse: String },
    ADMIN_USERNAME: { type: 'string', _parse: String },
    ADMIN_PASSWORD: { type: 'string', _parse: String },
  },
  { dotEnvPath: null, strict: true },
)

export const ACCESS_TOKEN_EXPIRES_IN_SEC = 900

export const REFRESH_TOKEN_EXPIRES_IN_SEC = 86400 * 30
